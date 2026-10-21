from fastapi import HTTPException
from sqlalchemy import select, delete
from sqlalchemy.orm import Session
from db.models.festival import Festival
from db.models.festival_likes import FestivalLikes
from ..exceptions.like_exception import LikeNotFoundExcepton, LikeAlreadyExistsException
from ..schemas.like_schemas import AddLike
from userinfo.exceptions.userinfo import UserCredentialsException

def add_like(data: AddLike, db: Session):

    stmt = select(FestivalLikes).where(FestivalLikes.festival_id == data.festival_id, FestivalLikes.user_id == data.user_id)

    existing_like = db.scalar(stmt)

    if existing_like is not None:
        raise LikeAlreadyExistsException

    like = FestivalLikes(user_id=data.user_id, festival_id=data.festival_id)

    db.add(like)
    db.commit()
    db.refresh(like)
    return like


def remove_like(like_id: int, user_id: int, db: Session):
    like = db.get(FestivalLikes, like_id)

    if like is None:
        raise LikeNotFoundExcepton

    if like.user_id != user_id:
        raise UserCredentialsException

    db.delete(like)
    db.commit()


def get_likes_by_user_id(user_id: int, db: Session):
    stmt = select(Festival).join(FestivalLikes, FestivalLikes.festival_id == Festival.id).where(FestivalLikes.user_id == user_id).order_by(FestivalLikes.like_id.asc())

    likesInfo = db.scalars(stmt).all()

    return [
        {
            "title": info.title,
            "festival_id": info.id
        }
        for info in likesInfo
    ]