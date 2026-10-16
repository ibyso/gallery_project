from sqlalchemy import select
from sqlalchemy.orm import Session

from db.models.userinfo import UserInfo
from member_user.schemas.userinfo import UserInfoCreate
from core.security import hash_password
from member_user.exceptions.userinfo import UserAlreadyExistsException


# 회원가입
def register_user(db: Session, data: UserInfoCreate) -> UserInfo:

    # 1. 동일한 이메일이 이미 존재하는지 확인
    existing_user = db.scalar(
        select(UserInfo).where(UserInfo.email == data.email)
    )

    if existing_user is not None:
        raise UserAlreadyExistsException

    # 2. 회원 정보 생성 (비밀번호 해싱)
    new_user = UserInfo(
    email=data.email,
    name=data.name,
    password=hash_password(data.password),
    age=data.age,
    gender=data.gender,
)

    # 3. 데이터베이스에 저장
    db.add(new_user)
    db.commit()

    # 4. 저장된 회원 정보 다시 조회
    db.refresh(new_user)

    return new_user