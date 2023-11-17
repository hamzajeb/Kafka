from kafka import KafkaProducer
import pandas as pd
import json

def configure_kafka_producer():
    """
    Configure and return a KafkaProducer with specified settings.
    """
    producer = KafkaProducer(
        bootstrap_servers='localhost:9092',  # Adresse du broker Kafka
        value_serializer=lambda v: json.dumps(v).encode('utf-8'),  # Sérialisation en JSON
        compression_type='gzip',  # Compression des messages
        batch_size=16384,  # Taille du lot (16 KB)
        linger_ms=5  # Délai d'attente avant envoi du lot
    )
    # Les messages que le producteur envoie sont sérialisés en JSON pour être bien structurés, et ils sont encodés en UTF-8 
    # pour assurer la compatibilité avec Kafka,aussi Les messages sont compressés en utilisant l'algorithme de compression Gzip 
    # avant d'être envoyés à Kafka, ce qui peut économiser de la bande passante. 
    # Les messages sont regroupés dans des lots de 16 KB avant d'être envoyés à Kafka. Cela améliore l'efficacité de l'envoi 
    # en réduisant le nombre de requêtes.
    # linger_ms=5 : Cela ajoute un délai d'attente de 5 millisecondes avant d'envoyer un lot, permettant de regrouper plusieurs messages 
    # dans un lot pour améliorer l'efficacité de l'envoi.
    return producer

def read_csv_data(file_path):
    """
    Read data from a CSV file and return a Pandas DataFrame.
    """
    return pd.read_csv(file_path)

def get_partition_key(index, total_partitions):
    """
    Calculate the partition key for uniform distribution.
    """
    return index % total_partitions

def convert_to_bytes(value):
    """
    Convert a value to bytes using UTF-8 encoding.
    """
    return bytes(str(value), encoding='utf-8')

def produce_to_kafka(producer, topic, df, num_partitions):
    """
    Produce data to Kafka topic with specified partitioning.
    """
    for index, row in df.iterrows():
        partition = get_partition_key(index, num_partitions)
        key = convert_to_bytes(partition)
        # Envoi des lignes du fichier au topic spécifié en spécifiant la partition
        producer.send(topic, key=key, value=row.to_dict())

    producer.flush()  # Vider le tampon

if __name__ == '__main__':
    # Configuration du producteur Kafka
    kafka_producer = configure_kafka_producer()

    # Chemin du fichier CSV
    csv_file_path = './../../data/customer_churn.csv'

    # Lecture des données depuis le fichier CSV
    df = read_csv_data(csv_file_path)

    # Nombre de partitions pour la distribution
    num_partitions = 4

    # Nom du topic Kafka
    kafka_topic = 'customer_churn_data'

    # Production des données vers Kafka
    produce_to_kafka(kafka_producer, kafka_topic, df, num_partitions)
