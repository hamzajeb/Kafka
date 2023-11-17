from pydantic import BaseSettings
from datetime import timedelta

class Settings(BaseSettings):
    database_url: str = "postgresql://admin:admin@db:5432/BIGDATA"
    secret_key: str = "123456789"
    algorithm: str = "HS256"
    access_token_expire: timedelta = timedelta(hours=24)


settings = Settings()