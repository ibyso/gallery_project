from core.database import Base
from sqlalchemy import Identity, DateTime, String, ForeignKey, Integer, UniqueConstraint, Numeric, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .users import Users


class Festival(Base):

    __tablename__ = "festivals"

    id: Mapped[int] = mapped_column(Identity(start=1, increment=1), primary_key=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    addr1: Mapped[str] = mapped_column(String(200))
    addr2: Mapped[str] = mapped_column(String(200))
    startdate: Mapped[str] = mapped_column(String(8))
    enddate: Mapped[str] = mapped_column(String(8))
    thumbnail: Mapped[str] = mapped_column(String(200))
    mapx: Mapped[str] = mapped_column(Numeric(13, 10))
    mapy: Mapped[str] = mapped_column(Numeric(13, 10))
    tel: Mapped[str] = mapped_column(String(13))
    zipcode : Mapped[int] = mapped_column(Integer)
    homepage: Mapped[str] = mapped_column(String(100))
    overview: Mapped[str] = mapped_column(String(200))
    playtime: Mapped[str] = mapped_column(String(20))
    eventplace: Mapped[str] = mapped_column(String(200))
    program: Mapped[str] = mapped_column(String(2000))
    posted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    is_public:Mapped[bool] = mapped_column(default=True)
    is_delete:Mapped[bool] = mapped_column(default=False)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False
    )

    user: Mapped["Users"] = relationship("Users",back_populates="festivals")


class Festival_Views(Base) :
    __tablename__ = "festival_views"

    # unique 제약조건
    __table_args__ = (UniqueConstraint("festival_id","user_id",name="uq_festival_view_user"),)

    id : Mapped[int] = mapped_column(Identity(start=1, increment=1), primary_key=True)
    user_id: Mapped[int] = mapped_column(
            ForeignKey("users.id"), nullable=False
        )
    festival_id: Mapped[int] = mapped_column(ForeignKey("festivals.id"), nullable=False)
    viewed_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)