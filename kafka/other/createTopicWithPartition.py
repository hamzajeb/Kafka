from confluent_kafka.admin import AdminClient, NewTopic

# Fonction pour créer un nouveau sujet dans un cluster Kafka
def create_topic(bootstrap_servers, topic_name, num_partitions, replication_factor=1):
    # Configuration de l'AdminClient avec les serveurs d'amorçage (bootstrap servers)
    admin_client = AdminClient({'bootstrap.servers': bootstrap_servers})

    # Création d'un objet NewTopic avec les paramètres spécifiés
    new_topic = NewTopic(
        topic=topic_name,
        num_partitions=num_partitions,
        replication_factor=replication_factor
    )

    # Création du sujet
    admin_client.create_topics([new_topic])

    # Attente de la fin de la création du sujet
    admin_client.poll(timeout=5)

    # Affichage d'un message indiquant la création du sujet
    print(f"Le sujet '{topic_name}' a été créé avec {num_partitions} partitions et un facteur de réplication de {replication_factor}.")


if __name__ == "__main__":
    # les serveurs d'amorçage Kafka appropriés
    bootstrap_servers = 'localhost:9092'

    # le nom du sujet souhaité
    topic_name = 'customer_churn_data'

    # nombre de partitions
    partitions = 4

    # Appel de la fonction avec les paramètres spécifiés
    create_topic(bootstrap_servers, topic_name, partitions, replication_factor=1)
