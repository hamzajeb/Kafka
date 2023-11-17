from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# DATABASE_URL = "postgresql://admin:admin@db:5432/postgres"  # Replace with your PostgreSQL connection URL

# Access the DATABASE_URL environment variable when use K8S
# DATABASE_URL = os.environ.get("DATABASE_URL")

#test local
DATABASE_URL = "postgresql://postgres:admin@localhost:5432/BIGDATA"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()