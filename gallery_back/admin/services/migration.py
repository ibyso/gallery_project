from sqlalchemy.orm import Session
from db.models.festival import Festival
from admin.schemas.migration import migrationInsert


def create(db: Session, datas:list[migrationInsert]):

    festivals = [Festival(**migrationInsert(**data).model_dump()) for data in datas]
    db.add_all(festivals)
    db.commit()
    
    return festivals