from db.database import Base
from sqlalchemy import Identity, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime


class Festival_Views(Base):
    __tablename__ = "festival_views"

    id: Mapped[int] = mapped_column(Identity(start=1, increment=1), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("UserInfo.user_id"), nullable=False)
    festival_id: Mapped[int] = mapped_column(ForeignKey("festivals.id"), nullable=False)
    viewed_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)