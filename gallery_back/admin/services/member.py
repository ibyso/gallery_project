from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session

from db.models.userinfo import UserInfo, UserRole, UserAllowed
from admin.schemas.member import MemberSearchParams, SearchCriteria, MemberPageResponse
from userinfo.exceptions.userinfo import UserNotFoundException
from admin.exceptions.admin_userinfo import AdminInvalidAllowedException, AdminPermissionDeniedError
from datetime import timedelta

# 전체 목록
def select_all_member(db: Session, data: MemberSearchParams, current_user:UserInfo) -> MemberPageResponse:
    # 접근 제어
    if current_user.role not in (UserRole.Admin, UserRole.Manager) or current_user.allow != UserAllowed.Approved :
        raise AdminPermissionDeniedError

    stmt = select(UserInfo)

    # 기본 검색
    if data.keyword:
        if data.criteria == SearchCriteria.ALL:
            stmt = stmt.where(or_(
                UserInfo.email.contains(data.keyword),
                UserInfo.name.contains(data.keyword)
            ))
        
        elif data.criteria == SearchCriteria.EMAIL:
            stmt = stmt.where(UserInfo.email.contains(data.keyword))

        elif data.criteria == SearchCriteria.NAME:
            stmt = stmt.where(UserInfo.name.contains(data.keyword))

    # 상세 검색
    if data.isAllow:
        stmt = stmt.where(UserInfo.allow == data.isAllow)

    if data.start_date:
        stmt = stmt.where(UserInfo.joined_at >= data.start_date)

    if data.end_date:
        stmt = stmt.where(UserInfo.joined_at < data.end_date + timedelta(days=1))

    # 기본 조건
    stmt = stmt.where(UserInfo.role == UserRole.Member)

    # 전체 검색 결과 개수
    total = db.scalar(select(func.count()).select_from(stmt.subquery())) or 0

    # 페이지네이션
    offset = (data.page - 1) * data.size

    stmt = (
        stmt
        .order_by(UserInfo.user_id.desc())
        .offset(offset)
        .limit(data.size)
    )

    items = db.scalars(stmt).all()

    return MemberPageResponse(
        items=items,
        total=total,
        page=data.page,
        size=data.size,
        total_pages=(total + data.size - 1) // data.size,
        criteria=data.criteria,
        keyword=data.keyword,
        isAllow=data.isAllow,
        start_date=data.start_date,
        end_date=data.end_date
    )


def update_allow_member(db: Session, user_id:int, allow_status:str, current_user:UserInfo):
    if allow_status not in UserAllowed :
        raise AdminInvalidAllowedException

    # 접근 제어
    if current_user.role != UserRole.Admin or current_user.allow != UserAllowed.Approved :
        raise AdminPermissionDeniedError
    
    user = db.get(UserInfo, user_id)

    if user is None:
        raise UserNotFoundException

    if user.allow == allow_status :
        raise AdminInvalidAllowedException


    user.allow = allow_status
    db.commit()
    db.refresh(user)
    return user
