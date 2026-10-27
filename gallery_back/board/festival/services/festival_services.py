from fastapi import HTTPException
from sqlalchemy import select, update
from sqlalchemy.orm import Session
from db.models.festival import Festival
from db.models.festival_views import Festival_Views
from ..exceptions.festival_exception import FestivalNotFoundException


def get_festivals(db: Session) -> list[dict]:
    stmt = select(Festival).where(Festival.is_public == True, Festival.is_delete == False)

    festivals = db.scalars(stmt).all()

    results = [
        {
            "id": festival.id,
            "title": festival.title,
            "addr1": festival.addr1,
            "thumbnail": festival.thumbnail,
            "startdate": festival.startdate,
            "enddate": festival.enddate,
            "program": festival.program,
            "views": festival.views,
        }
        for festival in festivals
    ]

    return results


def update_views(db: Session, festival_id: int, user_id: int):
    stmt = select(Festival).where(Festival.id == festival_id, Festival.is_public == True, Festival.is_delete == False).with_for_update()


    festival = db.scalar(stmt)

    if festival is None:
        raise FestivalNotFoundException

    festival.views += 1

    festival_view = Festival_Views(festival_id=festival.id, user_id=user_id)
    db.add(festival_view)

    views = festival.views

    db.commit()

    return {"festival_id": festival_id, "views": views}
