from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.database import get_db
from userinfo.schemas.userinfo import UserInfoCreate, UserInfoResponse
from userinfo.services.userinfo import register_user
from userinfo.exceptions.userinfo import UserAlreadyExistsException
from userinfo.schemas.userinfo import UserInfoLogin, Token
from userinfo.services.userinfo import authenticate_user
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
