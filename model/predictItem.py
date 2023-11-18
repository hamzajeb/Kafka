from kafka import KafkaConsumer, KafkaProducer,TopicPartition
from pyspark.ml import PipelineModel
from pyspark.sql import SparkSession
from pyspark.ml.classification import  LogisticRegressionModel
from pyspark.ml.feature import VectorAssembler
import json
import os
import sys

# Configuration Kafka
kafka_bootstrap_servers = 'localhost:9092'
kafka_topic = 'predict_chrun11'
os.environ['PYSPARK_PYTHON'] = sys.executable
os.environ['PYSPARK_DRIVER_PYTHON'] = sys.executable
# Configuration Spark
spark = SparkSession.builder.appName("ChurnPredictionItem").getOrCreate()
saved_model = LogisticRegressionModel.load(r'C:\Users\lenovo\OneDrive\Documents\LSI4\BIG DATA\PROJET\model\bestModel')

def publish_to_kafka(message):
    """
    Publie un message dans le topic Kafka.
    """
    producer = KafkaProducer(
        bootstrap_servers='localhost:9092',  # Adresse du broker Kafka
        value_serializer=lambda v: json.dumps(v).encode('utf-8'),  # Sérialisation en JSON
        compression_type='gzip',  # Compression des messages
        batch_size=16384,  # Taille du lot (16 KB)
        linger_ms=5  # Délai d'attente avant envoi du lot
    )

    # try:
    producer.send(kafka_topic, message)
    producer.flush()
    print(f"Message publié avec succès : {message}")
    # except Exception as e:
    #     print(f"Erreur lors de la publication du message : {e}")

def consume_and_predict(): 
    """
    Consomme un message du topic Kafka, prédit à l'aide du modèle PySpark et affiche le résultat.
    """
    consumer = KafkaConsumer(
        kafka_topic,  # Nom du topic Kafka
        bootstrap_servers='localhost:9092',  # Adresse du broker Kafka
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),  # Désérialisation depuis JSON
        auto_offset_reset='earliest',  # Position de départ si aucune offset n'est enregistrée
    )

    # Création d'un objet TopicPartition pour représenter une partition spécifique dans Kafka , existe une seule est 0
    partition = TopicPartition(kafka_topic, 0)
    # Obtention des offsets de fin pour la partition spécifiée
    end_offset = consumer.end_offsets([partition])
    # Déplacement du curseur de lecture du consommateur Kafka à l'offset calculé
    consumer.seek(partition,list(end_offset.values())[0]-1)

    for m in consumer:
        result = predict_with_spark_model(m.value)
        # Affichage pour illustrer
        print(f"Message consommé : {m.value}, Résultat de prédiction : {result}")
        break
    return result


def predict_with_spark_model(message):
    """
    Utilise le modèle PySpark trainé en temps réel pour prédire.
    """
    data = [message]
    print(data)
    new_customers = spark.createDataFrame(data)
    feature_cols = ["Age", "Total_Purchase", "Account_Manager", "Years", "Num_Sites"]
    assembler = VectorAssembler(inputCols=feature_cols, outputCol="features")
    test_new_customers = assembler.transform(new_customers)

    # Transformation du message avec le modèle PySpark
    final_results = saved_model.transform(test_new_customers)

    # Récupération de la prédiction
    prediction = final_results.select("prediction").collect()[0]["prediction"]

    return prediction

# # Exemple d'utilisation
# message_to_publish = {'Names': 'AMichele Wright', 'Age': 23.0, 'Total_Purchase': 7526.94, 'Account_Manager': 1, 'Years': 9.28, 'Num_Sites': 15.0, 'Onboard_date': '2013-07-22 18:19:54', 'Location': '21083 Nicole Junction Suite 332, Youngport, ME 23686-4381', 'Company': 'Cannon-Benson'}
# # message_to_publish = {'Names': 'Andrew Mccall', 'Age': 37.0, 'Total_Purchase': 9935.53, 'Account_Manager': 1, 'Years': 7.71, 'Num_Sites': 8.0, 'Onboard_date': '2011-08-29 18:37:54', 'Location': '080 Brewer Ports Suite 299 Erinmouth, TX 28755', 'Company': 'King Ltd'}
# publish_to_kafka(message_to_publish)

# # Consommer et prédire
# consume_and_predict()
