from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from ..services.festival_services import get_festivals

festival_router = APIRouter(tags=["Festivals"])


@festival_router.get("", response_model=list[dict])
def read_festivals(db: Session = Depends(get_db)):
    return get_festivals(db=db)