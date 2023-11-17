from pyspark.sql import SparkSession
from pyspark.ml.classification import LogisticRegressionModel,LogisticRegression, DecisionTreeClassifier, RandomForestClassifier,LinearSVC,GBTClassifier
from pyspark.ml import Pipeline
from pyspark.ml.evaluation import BinaryClassificationEvaluator
from pyspark.ml.evaluation import BinaryClassificationEvaluator
from pyspark.ml.feature import VectorAssembler, StringIndexer
import os
import sys






# # Charger le fichier CSV en tant que DataFrame
# data = spark.read.csv("./../data/customer_churn.csv", header=True, inferSchema=True)

# # Afficher le schéma du DataFrame
# data.printSchema()

def train_model(dataTraining):
    os.environ['PYSPARK_PYTHON'] = sys.executable
    os.environ['PYSPARK_DRIVER_PYTHON'] = sys.executable
    # Création d'une session Spark
    spark = SparkSession.builder.appName("ChurnPrediction").getOrCreate()
    df = spark.createDataFrame(dataTraining)
    df = (
    df
    .withColumn("Account_Manager", df["Account_Manager"].cast("int"))
    .withColumn("Churn", df["Churn"].cast("int"))
    )
    print(df)
    # Créer un VectorAssembler pour assembler les caractéristiques en une seule colonne
    feature_cols = ["Age", "Total_Purchase", "Account_Manager", "Years", "Num_Sites"]
    assembler = VectorAssembler(inputCols=feature_cols, outputCol="features")
    data = assembler.transform(df)
    # le DataFrame data aura une nouvelle colonne "features" qui contient des vecteurs de caractéristiques créés en assemblant 
    # les valeurs des colonnes spécifiées dans feature_cols. Nous pouvez utiliser cette colonne "features" comme entrée pour 
    # notre modèle d'apprentissage automatique. Par exemple, si nous utilisons un modèle de régression logistique, nous pouvons 
    # spécifier "features" comme la colonne d'entrée contenant les vecteurs de caractéristiques.

    # Elle crée un nouveau DataFrame final_data qui ne contient que les colonnes 'features' et 'churn'.
    final_data = data.select('features','churn')

    train_data, test_data = final_data.randomSplit([0.8, 0.2], seed=42)
    print(train_data)
    # Initialisation des modèles
    lr = LogisticRegression(labelCol="churn", featuresCol="features")
    # La régression logistique est un algorithme de classification binaire utilisé pour prédire la probabilité qu'une observation 
    # appartienne à une classe particulière. Malgré son nom, la régression logistique est utilisée dans des tâches de classification, 
    # pas de régression.
    dt = DecisionTreeClassifier(labelCol="churn", featuresCol="features")
    # Les arbres de décision sont une méthode d'apprentissage supervisé utilisée à la fois pour la classification et la régression.
    # L'idée principale est de créer un arbre qui représente une série de décisions pour parvenir à une conclusion. Chaque nœud de l'arbre 
    # représente une question (une décision) sur une caractéristique particulière, et chaque branche sortante de ce nœud représente 
    # une des réponses possibles à cette question. Les feuilles de l'arbre contiennent les étiquettes de classe ou les valeurs prédites.
    rf = RandomForestClassifier(labelCol="churn", featuresCol="features")
    #  Une collection d'arbres de décision où chaque arbre "vote" pour la classe, et la classe majoritaire est choisie.
    gbt = GBTClassifier(featuresCol="features", labelCol="churn")
    # Le Gradient Boosting est une technique d'ensemble qui construit un modèle de manière itérative, en corrigeant les erreurs 
    # des modèles précédents. Il s'agit d'une méthode d'apprentissage automatique puissante et largement utilisée, en particulier 
    # pour les tâches de régression et de classification.
    svm = LinearSVC(featuresCol="features", labelCol="churn", maxIter=10)
    # Les machines à vecteurs de support sont des modèles qui cherchent à trouver un hyperplan optimal pour séparer les données 
    # en deux classes. L'hyperplan est défini comme le plan de séparation qui maximise la marge, la distance entre l'hyperplan 
    # et les observations les plus proches de chaque classe, appelées vecteurs de support.


    lr_model = lr.fit(train_data)

    # # Chargez le modèle à partir du disque
    # loaded_model = LogisticRegressionModel.load("x3")

    dt_model = dt.fit(train_data)
    rf_model = rf.fit(train_data)
    gbt_model = gbt.fit(train_data)
    svm_model = svm.fit(train_data)


    evaluator = BinaryClassificationEvaluator(labelCol="churn", metricName="areaUnderROC")

    # Logistic Regression
    lr_predictions = lr_model.transform(test_data)
    lr_auc = evaluator.evaluate(lr_predictions)
    print("Logistic Regression AUC: {:.4f}".format(lr_auc))

    # Logistic Regression
    dt_predictions = dt_model.transform(test_data)
    dt_auc = evaluator.evaluate(dt_predictions)
    print("DecisionTreeClassifier AUC: {:.4f}".format(dt_auc))

    # Random Forest
    rf_predictions = rf_model.transform(test_data)
    rf_auc = evaluator.evaluate(rf_predictions)
    print("Random Forest AUC: {:.4f}".format(rf_auc))

    # Gradient Boosted Tree
    gbt_predictions = gbt_model.transform(test_data)
    gbt_auc = evaluator.evaluate(gbt_predictions)
    print("Gradient Boosted Tree AUC: {:.4f}".format(gbt_auc))

    svm_predictions = svm_model.transform(test_data)
    svm_auc = evaluator.evaluate(svm_predictions)
    print("Support Vector Machine AUC: {:.4f}".format(svm_auc))


    # On suppose que lr_model a le meilleur score AUC
    best_modele, best_auc = lr_model, lr_auc

    # Comparer les scores AUC et les modèles
    modeles_et_aucs = [(dt_model, dt_auc), (rf_model, rf_auc), (gbt_model, gbt_auc), (svm_model, svm_auc)]

    for modele, auc in modeles_et_aucs:
        print(f"{modele.__class__.__name__} AUC : {auc:.4f}")
        
        # Vérifier si le modèle actuel a un score AUC plus élevé
        if auc > best_auc:
            best_modele, best_auc = modele, auc

    best_modele.write().overwrite().save("./../../model/bestModel0")
    print("Meilleur modèle enregistré avec AUC: {:.4f}".format(best_auc))
######################################################################################
# import pickle
# pipeline = Pipeline(stages=[lr])

# # Ajuster le modèle
# model = pipeline.fit(train_data)
# model_data = model.stages[0].extractParamMap()

# # Enregistrer le modèle au format pickle
# with open("modele.pkl", "wb") as f:
#     pickle.dump(model_data, f)
############################################################################################

# Pyspark utilise le multithreading pour effectuer des opérations de manière parallèle lors du traitement distribué des données. 
# Cela peut être utilisé de manière interne par Spark pour optimiser les calculs sur un cluster.

# Dans le contexte de PySpark, Spark utilise le multithreading, et certains objets, tels que SparkSession, 
# peuvent ne pas être directement picklables en raison de leur implication dans les threads.

# Pour résoudre ce problème, lors de l'utilisation de PySpark, il est généralement recommandé d'utiliser les propres méthodes 
# de sérialisation de PySpark au lieu d'essayer de pickler directement des objets liés à Spark.

# Si vous souhaitez sauvegarder et charger un modèle PySpark MLlib, je vous recommande d'utiliser les méthodes save et load 
# fournies par les classes de modèle MLlib, comme démontré dans l'exemple précédent. Cela garantit que le modèle est enregistré
#  dans un format compatible avec Spark.



