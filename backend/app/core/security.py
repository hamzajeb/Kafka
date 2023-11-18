from jose import JWTError, jwt
from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from jwt import PyJWTError
from pydantic import BaseModel
from starlette.status import HTTP_401_UNAUTHORIZED
from functools import wraps
from app.models.user import User, UserDB
from app.core.config import settings
from app.database.connection import get_db
from sqlalchemy.orm import Session
from inspect import iscoroutinefunction
from passlib.context import CryptContext
from datetime import datetime, timedelta

SECRET_KEY = "123456789"  # Replace with your secret key
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="getToken")


class TokenData(BaseModel):
    email: str


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + settings.access_token_expire
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=HTTP_401_UNAUTHORIZED, detail="Could not validate credentials"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception  
    user = UserDB.get_user_data(email=token_data.email, db=db)
    
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: UserDB = Depends(get_current_user)):
    if current_user.user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def has_role(roles: list):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, current_user: UserDB = Depends(get_current_user), **kwargs):
            if current_user.role not in roles:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Admin will be notified")
            if iscoroutinefunction(func):
                return await func(*args, **kwargs)
            else:
                return func(*args, **kwargs)
        return wrapper
    return decorator


#is logged in
def is_logged_in(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        user: User = await get_current_user()
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
        return await func(*args, **kwargs)
    return wrapper

#get user_id asynv
async def get_user_id(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=HTTP_401_UNAUTHORIZED, detail="Could not validate credentials"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except PyJWTError:
        raise credentials_exception
    user = UserDB.get_user_data(email=token_data.email, db=db)
    if user is None:
        raise credentials_exception
    return user.user_id

#check if any user exists if not create admin
def check_if_admin_exists(db: Session = Depends(get_db)):
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    first_name = "admin"
    last_name = "admin"
    email = "admin@admin.com"
    password = "admin"
    role = "superadmin"

    hashed_password = pwd_context.hash(password)
    
    #get number of users
    user_count = db.query(UserDB).count()
    if user_count == 0:
        admin_user = UserDB(first_name=first_name, last_name=last_name, email=email, password_hash=hashed_password, role=role)
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        print("Admin created")

#check if admin@admin.com exist, return true
def check_if_admin_exists_return_bool(db: Session = Depends(get_db)):
    user = db.query(UserDB).filter_by(email="admin@admin.com").first()
    if user is None:
        return False
    else:
        return True
    