from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.database import get_db
from db.models.userinfo import UserInfo
from core.dependencies import get_current_user
from admin.schemas.userinfo import UserInfoCreate, UserInfoLogin, UserInfoResponse, Token
from admin.services.userinfo import register_admin, authenticate_admin
from admin.exceptions.admin_userinfo import AdminNotAcceptException
from userinfo.exceptions.userinfo import UserAlreadyExistsException, UserNotFoundException, InvalidPasswordException

# 회원 관련 API Router
admin_user_router = APIRouter(tags=["Admin_users"])


@admin_user_router.get("/me", response_model=UserInfoResponse)
async def read_me(current_user:UserInfo=Depends(get_current_user))->UserInfoResponse :
    return current_user

# 회원가입 API
@admin_user_router.post("/signup",response_model=UserInfoResponse)
def signup(data: UserInfoCreate, db: Session = Depends(get_db)):
    try:
        user = register_admin(db, data)
        return user

    except UserAlreadyExistsException:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="이미 가입된 이메일입니다."
        )


# 로그인 API
@admin_user_router.post("/signin",response_model=Token)
def signin(data: UserInfoLogin, db: Session = Depends(get_db)):
    try:
        token = authenticate_admin(db,data.email,data.password)

    except UserNotFoundException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="아이디나 비밀번호를 확인해주세요",
        )
    except InvalidPasswordException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="아이디나 비밀번호를 확인해주세요",
        )

    except AdminNotAcceptException:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="회원가입 대기중인 계정입니다. \n문의:010-xxxx-xxxx",
            )

    return token
