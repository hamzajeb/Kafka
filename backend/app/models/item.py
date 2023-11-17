from sqlalchemy import Column, Integer, String, ForeignKey,Float
from sqlalchemy.orm import Session
from app.database.connection import Base, get_db
from pydantic import BaseModel
from passlib.context import CryptContext
from fastapi import Depends
from typing import Optional
from sqlalchemy.orm import relationship


class ItemDB(Base):
    __tablename__ = "items"

    item_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Names = Column(String)
    Age = Column(Float)
    Total_Purchase = Column(Float)
    Account_Manager = Column(Integer)
    Years = Column(Float)
    Num_Sites = Column(Integer)
    Onboard_date = Column(String)
    Location = Column(String)
    Company = Column(String)
    Chrun = Column(Integer)

    # Define the foreign key relationship with UserDB
    user_id = Column(Integer, ForeignKey("users.user_id"))
    
    # Define the back-reference to the UserDB class
    user = relationship("UserDB", back_populates="items")
   
        
class ItemCreate(BaseModel):
    Names : str
    Age : float
    Total_Purchase : float
    Account_Manager : int
    Years : float
    Num_Sites : float
    Onboard_date : str
    Location : str
    Company : str
    user_id : int

    class Config:
        orm_mode = True





    