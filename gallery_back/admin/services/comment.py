from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session

from db.models.userinfo import UserInfo, UserRole, UserAllowed
from db.models.festival import Festival
from db.models.comment import Comment
from admin.schemas.comment import CommentSearchParams, CommentSearchCriteria
from admin.schemas.festival_comment import CommentPageResponse
from admin.exceptions.admin_userinfo import AdminPermissionDeniedError

from datetime import timedelta


# 전체 목록
def select_all_comments(db: Session, data: CommentSearchParams, current_user:UserInfo) -> CommentPageResponse:
    # 접근 제어
    if current_user.role not in (UserRole.Admin, UserRole.Manager) or current_user.allow != UserAllowed.Approved :
        raise AdminPermissionDeniedError

    stmt = select(Comment)

    # 기본 검색
    if data.keyword:
        if data.criteria == CommentSearchCriteria.ALL:
            stmt = stmt.where(or_(
                Comment.body.contains(data.keyword),
                Comment.userInfo.has(
                    UserInfo.name.contains(data.keyword)
                ),
                Comment.festivals.has(
                    Festival.title.contains(data.keyword)
                )
            ))
        
        elif data.criteria == CommentSearchCriteria.NAME:
            stmt = stmt.where(Comment.userInfo.has(
                UserInfo.name.contains(data.keyword)
            ))

        elif data.criteria == CommentSearchCriteria.BODY:
            stmt = stmt.where(Comment.body.contains(data.keyword))

        elif data.criteria == CommentSearchCriteria.USER_ID:
            stmt = stmt.where(Comment.user_id == data.keyword)

        elif data.criteria == CommentSearchCriteria.FESTIVAL_ID:
            stmt = stmt.where(Comment.content_id == data.keyword)

    # 상세 검색
    if data.start_date:
        stmt = stmt.where(Comment.updated_at >= data.start_date)

    if data.end_date:
        stmt = stmt.where(Comment.updated_at < data.end_date + timedelta(days=1))

    # 전체 검색 결과 개수
    total = db.scalar(select(func.count()).select_from(stmt.subquery())) or 0

    # 페이지네이션
    offset = (data.page - 1) * data.size

    stmt = (
        stmt
        .order_by(Comment.comment_id.desc())
        .offset(offset)
        .limit(data.size)
    )

    items = db.scalars(stmt).all()

    return CommentPageResponse(
        items=items,
        total=total,
        page=data.page,
        size=data.size,
        total_pages=(total + data.size - 1) // data.size,
        criteria=data.criteria,
        keyword=data.keyword,
        start_date=data.start_date,
        end_date=data.end_date
    )

# # 게시글 활성/비활성
# def update_festival_public(db: Session, id:int, is_public:bool, current_user:UserInfo):
#     # 접근 제어
#     if current_user.role != UserRole.Admin or current_user.allow != UserAllowed.Approved :
#         raise AdminPermissionDeniedError
    
#     festival = db.get(Festival, id)

#     festival.is_public = is_public
#     db.commit()
#     db.refresh(festival)
#     return festival