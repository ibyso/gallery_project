from sqlalchemy import select
from sqlalchemy.orm import Session

from db.models.userinfo import UserInfo
from userinfo.schemas.userinfo import UserInfoCreate, UserInfoUpdate
from core.security import hash_password, verify_password
from userinfo.exceptions.userinfo import UserAlreadyExistsException, UserNotFoundException


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


# 로그인 인증
def authenticate_user(
    db: Session,
    email: str,
    password: str
) -> UserInfo | None:

    # 1. 이메일로 회원 검색
    user = db.scalar(
        select(UserInfo).where(UserInfo.email == email)
    )

    # 2. 회원이 존재하지 않으면 인증 실패
    if user is None:
        return None

    # 3. 입력한 비밀번호와 저장된 해시 비밀번호 비교
    if not verify_password(password, user.password):
        return None

    # 4. 인증 성공 시 회원 정보 반환
    return user

# 사용자 ID로 회원 정보 조회
def get_user(db: Session, user_id: int) -> UserInfo:

    user = db.get(UserInfo, int(user_id))

    if user is None:
        raise UserNotFoundException

    return user

# 회원정보 변경
def update_user(
    db: Session,
    user_id: int,
    data: UserInfoUpdate
) -> UserInfo:

    # 1. 로그인한 사용자 조회
    user = get_user(db, user_id)

    # 2. 이메일 변경
    if data.email is not None:

        # 기존 이메일과 다른 경우에만 중복 검사
        if data.email != user.email:
            existing_user = db.scalar(
                select(UserInfo).where(UserInfo.email == data.email)
            )

            if existing_user is not None:
                raise UserAlreadyExistsException

            user.email = data.email

    # 3. 이름 변경
    if data.name is not None:
        user.name = data.name

    # 4. 비밀번호 변경
    if data.password is not None:

        # 현재 비밀번호 입력 확인
        if not data.current_password:
            raise ValueError("현재 비밀번호를 입력해주세요.")

        # 현재 비밀번호 일치 여부 확인
        if not verify_password(data.current_password, user.password):
            raise ValueError("현재 비밀번호가 올바르지 않습니다.")

        # 새 비밀번호 해싱
        user.password = hash_password(data.password)

    # 5. 데이터베이스 저장
    db.commit()
    db.refresh(user)

    return user