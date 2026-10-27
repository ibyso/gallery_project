from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.database import get_db
from ..services.festival_services import get_festivals, update_views
from ..exceptions.festival_exception import FestivalNotFoundException
from db.models.userinfo import UserInfo
from core.dependencies import get_current_user

festival_router = APIRouter(tags=["Festivals"])


@festival_router.get("", response_model=list[dict])
def read_festivals(db: Session = Depends(get_db)):
    return get_festivals(db=db)


@festival_router.post("/{festival_id}/views", response_model=dict)
def update_festival_views(festival_id: int, db: Session = Depends(get_db), current_user: UserInfo = Depends(get_current_user)):
    try:
        return update_views(db=db, festival_id=festival_id, user_id=current_user.user_id)
    except FestivalNotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="축제를 찾을 수 없습니다.")