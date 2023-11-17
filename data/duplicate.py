import pandas as pd

# Chargez le fichier CSV dans un DataFrame
file_path = 'customer_churn.csv'  # Assurez-vous de spécifier le chemin correct du fichier
data = pd.read_csv(file_path)
colonne='Onboard_date'
# Recherche des duplications dans la colonne 'Name'
duplicate_names = data[data.duplicated(subset=colonne, keep=False)]

# Affichage des lignes où les duplications ont été trouvées
if not duplicate_names.empty:
    print("Duplications trouvées pour la colonne ",colonne," :")
    print(duplicate_names)
else:
    print("Aucune duplication trouvée pour la colonne ",colonne," .")
