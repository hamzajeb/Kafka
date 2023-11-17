from pyspark.sql import SparkSession
from pyspark.ml.classification import  LogisticRegressionModel
from pyspark.ml.feature import VectorAssembler



spark = SparkSession.builder.appName("ChurnPrediction").getOrCreate()
new_customers = spark.read.csv('./../data/new_customers.csv',inferSchema=True,header=True)
feature_cols = ["Age", "Total_Purchase", "Account_Manager", "Years", "Num_Sites"]
assembler = VectorAssembler(inputCols=feature_cols, outputCol="features")
test_new_customers = assembler.transform(new_customers)
# Load the model in PySpark
loaded_model = LogisticRegressionModel.load("bestModel")

final_results = loaded_model.transform(test_new_customers)
     

final_results.select('Company','prediction').show()

