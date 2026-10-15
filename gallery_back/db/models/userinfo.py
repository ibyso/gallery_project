from db.database import Base
from sqlalchemy import Identity, DateTime, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

class UserInfo(Base):

    __tablename__ = "UserInfo"

    user_id: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True
    )
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(100), nullable=False)
    joined_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    role: Mapped[str] = mapped_column(String(10), nullable=False, default="회원")
    last_login: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    comments: Mapped[list["Comment"]] = relationship(back_populates="userInfo")
    

