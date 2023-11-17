from kafka import KafkaConsumer
import json
import sys
sys.path.append('./../../model') 
from TrainModel import train_model

def configure_kafka_consumer():
    """
    Configure and return a KafkaConsumer with specified settings.
    """
    consumer = KafkaConsumer(
        'customer_churn_data',  # Nom du topic Kafka
        bootstrap_servers='localhost:9092',  # Adresse du broker Kafka
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),  # Désérialisation depuis JSON
        # auto_offset_reset='earliest',  # Position de départ si aucune offset n'est enregistrée
    )
    # Dans un contexte de consommation, un consommateur Kafka utilise les offsets pour déterminer à partir de quel point il doit 
    # commencer à lire les messages. Par exemple, en spécifiant auto_offset_reset='earliest' lors de la configuration 
    # d'un consommateur, vous indiquez au consommateur de commencer la consommation depuis le tout début du log des messages
    # (Cela assure que le consommateur ne manque aucune donnée et commence à partir du tout premier message du topic)
    return consumer

def consume_from_kafka(consumer):
    """
    Consume data from Kafka and process it.
    """
    i=0
    data = []
    max_messages = 900
    try:
        for message in consumer:
            # Extraction des données
            value = message.value
            # Récupération de la partition
            partition = message.partition
            # Affichage pour illustrer
            print(f"Partition: {partition}, idData: {i}, Received data: {value}")
            i += 1
            data.append(value)

            if i >= max_messages:
                break  # Sortir de la boucle après la consommation du nombre souhaité de messages
    except KeyboardInterrupt:
        pass  # Handle KeyboardInterrupt (e.g., user interruption)

    print(f"Number of consumed messages: {len(data)}")
    train_model(data)

if __name__ == '__main__':
    # Configuration du consommateur Kafka
    kafka_consumer = configure_kafka_consumer()

    # Consommation des données depuis Kafka
    consume_from_kafka(kafka_consumer)

