from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from db.models.festival import Festival
from admin.schemas.migration import migrationInsert


# def create(db: Session, datas:list[migrationInsert]):

#     festivals = [Festival(**migrationInsert(**data).model_dump()) for data in datas]
#     db.add_all(festivals)
#     db.commit()
    
#     return festivals



def create(db: Session, datas: list[migrationInsert]):

    festivals = []

    try:
        for data in datas:
            festival = Festival(**migrationInsert(**data).model_dump())

            try:
                # 데이터별 SAVEPOINT 생성
                with db.begin_nested():
                    db.add(festival)
                    db.flush()  # 즉시 INSERT 실행 및 오류 확인

                # 정상 삽입된 데이터만 저장
                festivals.append(festival)

            except IntegrityError as e:
                # 제약조건 위반 데이터 건너뛰기
                print(f"삽입 실패 (ID: {data.get('id')}): {e.orig}")
                continue

        # 정상 데이터만 최종 커밋
        db.commit()

    except Exception:
        # 예상하지 못한 오류 발생 시 전체 롤백
        db.rollback()
        raise

    return festivals