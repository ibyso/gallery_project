from db.database import Base
from sqlalchemy import Identity, DateTime, String, Integer, Numeric, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from sqlalchemy.dialects.oracle import CLOB
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .comment import Comment

class Festival(Base):

    __tablename__ = "festivals"

    id: Mapped[int] = mapped_column(Identity(start=1, increment=1), primary_key=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    addr1: Mapped[str] = mapped_column(String(200), nullable=True)
    addr2: Mapped[str] = mapped_column(String(200), nullable=True)
    startdate: Mapped[str] = mapped_column(String(8), nullable=True)
    enddate: Mapped[str] = mapped_column(String(8), nullable=True)
    thumbnail: Mapped[str] = mapped_column(String(200), nullable=True)
    mapx: Mapped[str] = mapped_column(Numeric(13, 10), nullable=True)
    mapy: Mapped[str] = mapped_column(Numeric(13, 10), nullable=True)
    tel: Mapped[str] = mapped_column(String(50), nullable=True)
    zipcode : Mapped[int] = mapped_column(Integer, nullable=True)
    homepage: Mapped[str] = mapped_column(String(200), nullable=True)
    overview: Mapped[str] = mapped_column(String(4000, nullable=True))
    playtime: Mapped[str] = mapped_column(String(100), nullable=True)
    eventplace: Mapped[str] = mapped_column(String(500), nullable=True)
    program: Mapped[str] = mapped_column(CLOB, nullable=True)
    posted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, nullable=True)
    is_public:Mapped[bool] = mapped_column(default=True, nullable=True)
    is_delete:Mapped[bool] = mapped_column(default=False, nullable=True)

    comments: Mapped[list["Comment"]] = relationship("Comment",back_populates="festivals")