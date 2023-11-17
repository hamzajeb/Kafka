from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.security import has_role, get_current_user
from app.database.connection import get_db
from app.models.user import UserCreate, UserDB, UserUpdate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

#Get all users
@router.get("/users/")
@has_role("superadmin")
def get_all_users(db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    users = db.query(UserDB).all()      
    return users
        


#Create a new user
@router.post("/users/")
@has_role("superadmin")
def create_user(user: UserCreate, db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    hasehd_password = pwd_context.hash(user.password)
    db_user = UserDB(first_name=user.first_name, last_name=user.last_name, email=user.email, password_hash=hasehd_password, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

#Get a user by id
@router.get("/user/{user_id}/items")
@has_role(["superadmin"])
def get_items_by_item(user_id: int, db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    user = db.query(UserDB).filter_by(user_id=user_id).first()
    return user.items

#Get a user by id
@router.get("/users/{user_id}")
@has_role(["superadmin"])
def get_user(user_id: int, db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    user = db.query(UserDB).filter_by(user_id=user_id).first()
    return user

@router.put("/users/{user_id}")
@has_role(["superadmin"])
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    user_dict = user.dict(exclude_unset=True)  # Exclude unset fields
    if "password" in user_dict and user_dict["password"] is not None:
        user_dict["password_hash"] = pwd_context.hash(user_dict["password"])
        del user_dict["password"]
    user_dict.pop("user_id", None)
    try:
        with db.begin_nested():
            db.query(UserDB).filter_by(user_id=user_id).update(user_dict)
            db.flush()
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
        raise e
    else:
        db.commit()
    finally:
        db.close()

    return db.query(UserDB).filter_by(user_id=user_id).first()  # Return the updated user


#Delete a user by id
@router.delete("/users/{user_id}")
@has_role(["superadmin"])
def delete_user(user_id: int, db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    db.query(UserDB).filter_by(user_id=user_id).delete()
    db.commit()
    return({"message": "User deleted successfully!"})