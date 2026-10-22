
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.database import get_db
from db.models.userinfo import UserInfo
from core.dependencies import get_current_user

from userinfo.schemas.like_schemas import LikeFestivalResponse
from userinfo.services.like_service import get_user_likes


# 회원 좋아요 목록 API
like_router = APIRouter(
    prefix="/users",
    tags=["Likes"]
)


# 로그인한 사용자의 좋아요 목록 조회
@like_router.get(
    "/me/likes",
    response_model=list[LikeFestivalResponse]
)
def get_my_likes(
    db: Session = Depends(get_db),
    current_user: UserInfo = Depends(get_current_user)
):
    return get_user_likes(
        db=db,
        user_id=current_user.user_id
    )
