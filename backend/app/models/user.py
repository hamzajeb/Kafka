from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import Session
from app.database.connection import Base, get_db
from pydantic import BaseModel
from passlib.context import CryptContext
from fastapi import Depends
from typing import Optional
from sqlalchemy.orm import relationship
from app.models.item import ItemCreate, ItemDB

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserDB(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String)

    # Define the relationship with ItemDB
    items = relationship("ItemDB", back_populates="user")

    @staticmethod
    def hash_password(password: str) -> str:
        return pwd_context.hash(password)

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.password_hash)
    
    @classmethod
    def get_user_data(cls, email: str,  db: Session = Depends(get_db)):
        user = db.query(cls).filter(cls.email == email).first()
        return user if user else None
        

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    role: str

class UserCreate(UserBase):
    password: str

    def create_db_instance(self):
        return UserDB(
            first_name=self.first_name,
            last_name=self.last_name,
            email=self.email,
            password_hash=UserDB.hash_password(self.password),
            role=self.role,
        )

class User(UserBase):
    user_id: int

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    role: Optional[str] = None

    def get_updated_password_hash(self):
        if self.password:
            return UserDB.hash_password(self.password)
        return None
    