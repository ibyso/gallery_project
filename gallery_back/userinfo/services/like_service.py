from sqlalchemy import select
from sqlalchemy.orm import Session

from db.models.festival import Festival
from db.models.festival_likes import FestivalLikes


# 로그인한 사용자가 좋아요 누른 축제 목록 조회
def get_user_likes(db: Session, user_id: int):

    stmt = (
        select(
            FestivalLikes.user_id,
            FestivalLikes.festival_id,
            Festival.title
        )
        .join(
            Festival,
            FestivalLikes.festival_id == Festival.id
        )
        .where(FestivalLikes.user_id == user_id)
    )

    return db.execute(stmt).mappings().all()