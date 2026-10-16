from db.database import Base
from sqlalchemy import Identity, DateTime, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime


class Comment(Base):

    __tablename__ = "comments"

    comment_id: Mapped[int] = mapped_column(Identity(start=1, increment=1), primary_key=True)
    body: Mapped[str] = mapped_column(String(500), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)
    user_id: Mapped[int] = mapped_column(ForeignKey("UserInfo.user_id"), nullable=False)
    content_id: Mapped[int] = mapped_column(ForeignKey("festivals.id"), nullable=False)

    userInfo: Mapped["UserInfo"] = relationship(back_populates="comments")
    festivals: Mapped["Festival"] = relationship(back_populates="comments")