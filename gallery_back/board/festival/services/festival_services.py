from sqlalchemy import select
from sqlalchemy.orm import Session
from db.models.festival import Festival


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
        }
        for festival in festivals
    ]

    return results


