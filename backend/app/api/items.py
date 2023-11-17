from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.security import has_role, get_current_user
from app.database.connection import get_db
from app.models.user import UserCreate, UserDB, UserUpdate
from app.models.item import ItemCreate, ItemDB
from passlib.context import CryptContext
import sys
sys.path.append(r'C:\Users\lenovo\OneDrive\Documents\LSI4\BIG DATA\PROJET')
from model.predictItem import publish_to_kafka,consume_and_predict



router = APIRouter()

#Get all items
@router.get("/items/")
@has_role("superadmin")
def get_all_items(db: Session = Depends(get_db), current_user: ItemDB = Depends(get_current_user)):
    items = db.query(ItemDB).all()      
    return items

        


#Create a new user
@router.post("/items/")
@has_role("superadmin")
def create_item(item: ItemCreate, db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    obj_to_predict = {
    "Names": item.Names,
    "Age": item.Age,
    "Total_Purchase": item.Total_Purchase,
    "Account_Manager": item.Account_Manager,
    "Years": item.Years,
    "Num_Sites": item.Num_Sites,
    "Onboard_date": item.Onboard_date,
    "Location": item.Location,
    "Company": item.Company,
    }
    chrun=0
    print(obj_to_predict)
    publish_to_kafka(obj_to_predict)
    chrun = consume_and_predict()
    print("chrun : ",chrun)
    db_item = ItemDB(Names=item.Names, Age=item.Age, Total_Purchase=item.Total_Purchase, Account_Manager=item.Account_Manager,Years=item.Years,Num_Sites=item.Num_Sites,Onboard_date=item.Onboard_date,Location=item.Location,Company=item.Company,Chrun=chrun,user_id=item.user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item




