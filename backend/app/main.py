from fastapi import FastAPI, Depends
from app.database.connection import Base, engine
from app.api import auth, users
from app.core.security import oauth2_scheme
from app.database.connection import get_db
from app.core.security import check_if_admin_exists
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(users.router, prefix="/users", tags=["users"], dependencies=[Depends(oauth2_scheme)])

#check if any user exists
db = next(get_db())
check_if_admin_exists(db)


@app.get("/")
async def root():
    return {"message": "Welcome to the predict in real-time customer churn app API!"}

# --------1-------
# def get_db():
#     db = SessionLocal()
#     return db

# # Utilisation
# db = get_db()
# # ... faire quelque chose avec db ...
# db.close()

# --------2-------
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# En résumé, la deuxième approche avec le générateur et le mot-clé yield est généralement préférée dans les applications FastAPI 
# (ou similaires) car elle garantit une gestion appropriée des ressources, même en cas d'erreurs. Cela peut aider à éviter des 
# problèmes potentiels liés à la non-fermeture des connexions à la base de données.