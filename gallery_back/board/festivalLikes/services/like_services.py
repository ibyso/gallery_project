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
    stmt = (select(FestivalLikes, Festival).join(Festival, FestivalLikes.festival_id == Festival.id).where(FestivalLikes.user_id == user_id).order_by(FestivalLikes.like_id.asc()))

    rows = db.execute(stmt).all()

    return [
        {
            "like_id": like.like_id,
            "festival_id": festival.id,
            "title": festival.title,
        }
        for like, festival in rows
    ]


def get_like_counts(db: Session):
    stmt = select(FestivalLikes.festival_id)
    festival_ids = db.scalars(stmt).all()

    counts = {}

    for festival_id in festival_ids:
        if festival_id in counts:
            counts[festival_id] += 1
        else:
            counts[festival_id] = 1

    return [
        {
            "festival_id": festival_id,
            "like_count": count,
        }
        for festival_id, count in counts.items()
    ]