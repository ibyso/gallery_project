from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.database import get_db
from member_user.schemas.userinfo import UserInfoCreate, UserInfoResponse
from member_user.services.userinfo import register_user
from member_user.exceptions.userinfo import UserAlreadyExistsException


# 회원 관련 API Router
userinfo_router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# 회원가입 API
@userinfo_router.post(
    "/signup",
    response_model=UserInfoResponse,
    status_code=status.HTTP_201_CREATED
)
def signup(
    data: UserInfoCreate,
    db: Session = Depends(get_db)
):
    try:
        user = register_user(db, data)
        return user

    except UserAlreadyExistsException:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="이미 가입된 이메일입니다."
        )