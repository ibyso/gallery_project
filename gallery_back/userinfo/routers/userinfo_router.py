
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.database import get_db
from db.models.userinfo import UserInfo
from core.dependencies import get_current_user

from userinfo.schemas.userinfo import (
    UserInfoCreate,
    UserInfoResponse,
    UserInfoLogin,
    UserInfoUpdate,
    Token,
)

from userinfo.services.userinfo import (
    register_user,
    authenticate_user,
    update_user,
)

from userinfo.exceptions.userinfo import UserAlreadyExistsException
from userinfo.utils.security import create_access_token


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


# 로그인 API
@userinfo_router.post(
    "/signin",
    response_model=Token
)
def signin(
    data: UserInfoLogin,
    db: Session = Depends(get_db)
):
    # 1. 이메일과 비밀번호 인증
    user = authenticate_user(
        db,
        data.email,
        data.password
    )

    # 2. 인증 실패
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="이메일 또는 비밀번호가 올바르지 않습니다.",
            headers={"WWW-Authenticate": "Bearer"}
        )

    # 3. JWT 토큰 생성
    access_token = create_access_token(
        data={"sub": str(user.user_id)}
    )

    # 4. 토큰 반환
    return Token(
        access_token=access_token,
        token_type="bearer"
    )


# 회원정보 변경 API
@userinfo_router.patch(
    "/me",
    response_model=UserInfoResponse
)
def change_my_info(
    data: UserInfoUpdate,
    db: Session = Depends(get_db),
    current_user: UserInfo = Depends(get_current_user)
):
    try:
        # 로그인한 사용자의 회원정보 수정
        updated_user = update_user(
            db=db,
            user_id=current_user.user_id,
            data=data
        )

        return updated_user

    except UserAlreadyExistsException:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="이미 사용 중인 이메일입니다."
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# 현재 로그인한 회원정보 조회 API
@userinfo_router.get(
    "/me",
    response_model=UserInfoResponse
)
def get_my_info(
    current_user: UserInfo = Depends(get_current_user)
):
    return current_user
