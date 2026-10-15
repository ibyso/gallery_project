from core.database import Base
from sqlalchemy import Identity, DateTime, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .festival import Festival

class User(Base):

    __tablename__ = "users"

    user_id: Mapped[int] = mapped_column(
        Identity(start=1, increment=1), primary_key=True
    )
    name: Mapped[str] = mapped_column(String(20), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(100), nullable=False)
    joined_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)
    role: Mapped[int] = mapped_column(Integer, nullable=False)
    last_login: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)
    ip_addr: Mapped[str] = mapped_column(String(20))
      
    festivals: Mapped[list["Festival"]] = relationship("Festival",back_populates="user")
