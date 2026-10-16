from sqlalchemy import create_engine, URL
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from core.config import settings

database_url = URL.create(
    drivername="oracle+oracledb",
    username=settings.oracle_user,
    password=settings.oracle_password,
    host="localhost",
    port=1522,
    query={"service_name": "XEPDB1"},
)

engine = create_engine(database_url, echo=True)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

class Base(DeclarativeBase):
    pass

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()