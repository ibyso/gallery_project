from db.database import Base
from sqlalchemy import Identity, DateTime, String, Integer, Enum as SQLEnum, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING


if TYPE_CHECKING:
    from .comment import Comment
    from .festival_likes import FestivalLikes


# 성별
class Gender(str, Enum):
    Male = "Male"
    Female = "Female"


# 회원 권한
class UserRole(str, Enum):
    Admin = "Admin"
    Manager = "Manager"
    Member = "Member"


class UserInfo(Base):

    __tablename__ = "UserInfo"

    user_id: Mapped[int] = mapped_column(
        Integer,
        Identity(start=1, increment=1),
        primary_key=True
    )
    # 이름, 이메일, 비번
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(100), nullable=False)
    # 회원가입 날짜
    joined_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, nullable=False)

    # 수정한 날짜
    updated_at: Mapped[datetime | None] = mapped_column(DateTime, default=datetime.now, nullable=True)

    # 권한
    role: Mapped[UserRole] = mapped_column(SQLEnum(UserRole, native_enum=False, length=10, create_constraint=True),nullable=False,default=UserRole.Member)

    # 마지막 로그인
    last_login: Mapped[datetime | None] = mapped_column(DateTime, default=datetime.now, nullable=True)

    # 나이
    age: Mapped[int] = mapped_column(Integer, nullable=False)

    # 성별
    gender: Mapped[Gender] = mapped_column(SQLEnum(Gender, native_enum=False, length=10, create_constraint=True),nullable=False)

    # 승인여부(관리자)
    allow: Mapped[bool] = mapped_column(Boolean, default=False, nullable=True)

    # 댓글과 연동
    comments: Mapped[list["Comment"]] = relationship("Comment",back_populates="userInfo")

    # 좋아요와 연동
    likes: Mapped[list["FestivalLikes"]] = relationship("FestivalLikes",back_populates="userInfo")