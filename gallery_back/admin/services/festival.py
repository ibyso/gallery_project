from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session

from db.models.userinfo import UserInfo, UserRole, UserAllowed
from db.models.festival import Festival
from admin.schemas.festival import FestivalSearchParams, SearchCriteria
from admin.schemas.festival_comment import FestivalPageResponse
from admin.exceptions.admin_userinfo import AdminPermissionDeniedError

from datetime import timedelta


# 전체 목록
def select_all_festivals(db: Session, data: FestivalSearchParams, current_user:UserInfo) -> FestivalPageResponse:
    # 접근 제어
    if current_user.role not in (UserRole.Admin, UserRole.Manager) or current_user.allow != UserAllowed.Approved :
        raise AdminPermissionDeniedError

    stmt = select(Festival)

    # 기본 검색
    if data.keyword:
        if data.criteria == SearchCriteria.ALL:
            stmt = stmt.where(or_(
                Festival.title.contains(data.keyword),
                Festival.addr1.contains(data.keyword),
                Festival.addr2.contains(data.keyword),
                Festival.eventplace.contains(data.keyword),
                Festival.overview.contains(data.keyword),
                Festival.program.contains(data.keyword)
            ))
        
        elif data.criteria == SearchCriteria.TITLE:
            stmt = stmt.where(Festival.title.contains(data.keyword))

        elif data.criteria == SearchCriteria.ADDR:
            stmt = stmt.where(or_(
                Festival.addr1.contains(data.keyword),
                Festival.addr2.contains(data.keyword),
                Festival.eventplace.contains(data.keyword)
            ))

    # 상세 검색
    if data.is_public:
        stmt = stmt.where(Festival.is_public == data.is_public)

    if data.start_date:
        stmt = stmt.where(Festival.startdate >= data.start_date)

    if data.end_date:
        stmt = stmt.where(Festival.enddate < data.end_date + timedelta(days=1))

    # 전체 검색 결과 개수
    total = db.scalar(select(func.count()).select_from(stmt.subquery())) or 0

    # 페이지네이션
    offset = (data.page - 1) * data.size

    stmt = (
        stmt
        .order_by(Festival.id.desc())
        .offset(offset)
        .limit(data.size)
    )

    items = db.scalars(stmt).all()

    return FestivalPageResponse(
        items=items,
        total=total,
        page=data.page,
        size=data.size,
        total_pages=(total + data.size - 1) // data.size,
        criteria=data.criteria,
        keyword=data.keyword,
        is_public=data.is_public,
        is_delete=data.is_delete,
        start_date=data.start_date,
        end_date=data.end_date
    )

# 게시글 활성/비활성
def update_festival_public(db: Session, id:int, is_public:bool, current_user:UserInfo):
    # 접근 제어
    if current_user.role != UserRole.Admin or current_user.allow != UserAllowed.Approved :
        raise AdminPermissionDeniedError
    
    festival = db.get(Festival, id)

    festival.is_public = is_public
    db.commit()
    db.refresh(festival)
    return festival