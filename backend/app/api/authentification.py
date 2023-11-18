from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.security import create_access_token, check_if_admin_exists_return_bool
from app.database.connection import get_db
from app.models.user import UserDB,UserCreate
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



router = APIRouter()



@router.post("/getToken")
def signIn(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(UserDB).filter_by(email=form_data.username).first()
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not pwd_context.verify(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if check_if_admin_exists_return_bool(db):
        access_token = create_access_token(data={"sub": user.email})
        return {"access_token": access_token, "token_type": "bearer", "user_role": user.role}
    access_token = create_access_token(data={"sub": user.email})
    print(user.first_name)
    # return {"first_name":user.first_name,"last_name":user.last_name,"email": user.email,"access_token": access_token,"user_role": user.role}
    return {"first_name":user.first_name,"last_name":user.last_name,"email": user.email,"access_token": access_token,"user_role": user.role}

#Create a new user
@router.post("/users/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    hasehd_password = pwd_context.hash(user.password)
    db_user = UserDB(first_name=user.first_name, last_name=user.last_name, email=user.email, password_hash=hasehd_password, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


