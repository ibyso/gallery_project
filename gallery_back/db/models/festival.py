from db.database import Base
from sqlalchemy import Identity, DateTime, String, Integer, Numeric, Integer
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from sqlalchemy.dialects.oracle import CLOB

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
    homepage: Mapped[str] = mapped_column(String(200))
    overview: Mapped[str] = mapped_column(String(4000))
    playtime: Mapped[str] = mapped_column(String(20))
    eventplace: Mapped[str] = mapped_column(String(200))
    program: Mapped[str] = mapped_column(CLOB)
    posted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    is_public:Mapped[bool] = mapped_column(default=True)
    is_delete:Mapped[bool] = mapped_column(default=False)

