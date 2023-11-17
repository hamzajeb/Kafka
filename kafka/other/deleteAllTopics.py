from confluent_kafka.admin import AdminClient, NewTopic

def delete_all_topics(bootstrap_servers):
    # Configuration de l'AdminClient avec les serveurs d'amorçage (bootstrap servers)
    admin_client = AdminClient({'bootstrap.servers': bootstrap_servers})

    # Obtention de la liste des sujets
    topics_metadata = admin_client.list_topics().topics

    # Récupération des noms de tous les sujets
    topic_names = list(topics_metadata.keys())

    if not topic_names:
        print("Aucun sujet à supprimer.")
        return

    # Suppression de tous les sujets
    deletion_results = admin_client.delete_topics(topic_names)

    # Attente de la fin de la suppression des sujets
    for topic_name, future in deletion_results.items():
        try:
            future.result()  # Attendre que la suppression soit terminée
            print(f"Sujet '{topic_name}' supprimé avec succès.")
        except Exception as e:
            print(f"Erreur lors de la suppression du sujet '{topic_name}': {str(e)}")


if __name__ == "__main__":
    # les serveurs d'amorçage Kafka appropriés
    bootstrap_servers = 'localhost:9092'

    # Appel de la fonction avec les serveurs d'amorçage spécifiés
    delete_all_topics(bootstrap_servers)


# Resolve error after delete :
# Go to config folder in kafka folder (e.g. D:\kafka\config)  open zookeeper.properties Edit your datadir to look like : 
# dataDir = D:/kafka/data/zookeeper open server.properties in notepad and edit logs.dirs and zookeeper.
# connect logs.dirs = D:/kafka/data/kafka zookeeper.connect=localhost:2181 NOTE: replace D:\kafka according to your own 
# settings and folders you have for kafka
