from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.security import create_access_token, check_if_admin_exists_return_bool
from app.database.connection import get_db
from app.models.user import UserDB
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



router = APIRouter()

@router.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(UserDB).filter_by(email=form_data.username).first()
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not pwd_context.verify(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if check_if_admin_exists_return_bool(db):
        access_token = create_access_token(data={"sub": user.email})
        return {"access_token": access_token, "token_type": "bearer", "user_role": user.role}
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "user_role": user.role}


