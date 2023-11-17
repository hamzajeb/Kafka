# Importation des classes nécessaires depuis le module confluent_kafka.admin
from confluent_kafka.admin import AdminClient, NewTopic

# Fonction pour obtenir des détails sur les sujets (topics) d'un cluster Kafka
def get_topics_with_detail(bootstrap_servers):
    # Configuration de l'AdminClient avec les serveurs d'amorçage (bootstrap servers)
    admin_client = AdminClient({'bootstrap.servers': bootstrap_servers})

    # Obtention de la liste des sujets
    topics_metadata = admin_client.list_topics().topics

    # Affichage des détails pour chaque sujet
    for topic_name, topic_metadata in topics_metadata.items():
        print(f"Sujet : {topic_name}")
        print(f"  Partitions : {len(topic_metadata.partitions)}")
        print("\n")


if __name__ == "__main__":
    # les serveurs d'amorçage Kafka appropriés
    bootstrap_servers = 'localhost:9092'

    # Appel de la fonction avec les serveurs d'amorçage spécifiés
    get_topics_with_detail(bootstrap_servers)
