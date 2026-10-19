from db.database import Base
from sqlalchemy import Integer, Identity, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from db.models.userinfo import UserInfo
    from db.models.festival import Festival  # 실제 경로 확인 필요


class Like(Base):

    __tablename__ = "like"

    # 좋아요 PK
    like_id: Mapped[int] = mapped_column(
        Integer,
        Identity(start=1, increment=1),
        primary_key=True
    )

    # 사용자 FK
    user_id: Mapped[int] = mapped_column(
        ForeignKey("UserInfo.user_id"),
        nullable=False
    )

    # 축제 FK
    festival_id: Mapped[int] = mapped_column(
        ForeignKey("festivals.id"),
        nullable=False
    )

    # 같은 사용자가 같은 축제에 중복 좋아요 방지
    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "festival_id",
            name="uq_like_user_festival"
        ),
    )

    # 사용자와 연결
    userInfo: Mapped["UserInfo"] = relationship("UserInfo",back_populates="likes")

    # 축제와 연결
    festivals: Mapped["Festival"] = relationship("Festival",back_populates="likes")