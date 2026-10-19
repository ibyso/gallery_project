from sqlalchemy import select
from sqlalchemy.orm import Session

from db.models.userinfo import UserInfo, UserRole, Gender
from admin.schemas.userinfo import UserInfoCreate, Token
from core.security import hash_password, verify_password
from userinfo.exceptions.userinfo import UserAlreadyExistsException, InvalidPasswordException, UserNotFoundException
from admin.exceptions.admin_userinfo import AdminNotAcceptException, AdminRejectException
from core.security import create_access_token


# 회원가입
def register_admin(db: Session, data: UserInfoCreate) -> UserInfo:

    existing_user = db.scalar(
        select(UserInfo).where(UserInfo.email == data.email)
    )

    if existing_user is not None:
        raise UserAlreadyExistsException

    new_user = UserInfo(
        email=data.email,
        name=data.name,
        password=hash_password(data.password),
        age=100,    # 임시값 입력
        gender=Gender.Male, # 임시값 입력
        role=UserRole.Manager,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

# 로그인 인증
def authenticate_admin(db: Session,email: str,password: str) -> UserInfo | None:
    user = db.scalar(
        select(UserInfo).where(UserInfo.email == email, UserInfo.role.in_([UserRole.Manager,UserRole.Admin]))
    )

    if user is None:
        raise UserNotFoundException

    if not verify_password(password, user.password):
        raise InvalidPasswordException

    if user.allow is False :
        raise AdminNotAcceptException

    access_token = create_access_token(data={"sub":str(user.user_id)})

    return Token(access_token=access_token, token_type="bearer")
