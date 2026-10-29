from sqlalchemy import select, or_, func, case, desc
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from enum import Enum

from db.models.userinfo import UserInfo, UserRole, UserAllowed
from db.models.festival import Festival
from db.models.festival_likes import FestivalLikes
from db.models.festival_views import Festival_Views
from db.models.comment import Comment
from admin.exceptions.admin_userinfo import AdminPermissionDeniedError

from admin.schemas.dashboard import ManagementCounts, OverviewMetrics ,Metric, DailyActivity, PopularPost


def select_ManagementCounts(db: Session, current_user:UserInfo) -> ManagementCounts:
    # 접근 제어
    if current_user.role not in (UserRole.Admin, UserRole.Manager) or current_user.allow != UserAllowed.Approved :
        raise AdminPermissionDeniedError

    stmt = select(
            func.count(UserInfo.user_id).label("total"),
        ).where(
            UserInfo.allow == UserAllowed.Pending,
            UserInfo.role == UserRole.Manager
        )
    pendingApprovals = db.execute(stmt).one()

    stmt = select(
            func.count(Festival.id).label("total"),
        ).where(
            Festival.is_public == False
        )
    privatePosts = db.execute(stmt).one()

    stmt = select(
            func.count(Comment.comment_id).label("total"),
        ).where(
            Comment.is_delete == True
        )
    deletedComments = db.execute(stmt).one()

    stmt = select(
            func.count(UserInfo.user_id).label("total"),
        ).where(
            UserInfo.allow == UserAllowed.Rejected,
            UserInfo.role == UserRole.Member
        )
    blockedUsers = db.execute(stmt).one()

    return ManagementCounts(
        pendingApprovals=pendingApprovals.total,
        privatePosts=privatePosts.total,
        deletedComments=deletedComments.total,
        blockedUsers=blockedUsers.total
    )

def select_Overview(db: Session, current_user:UserInfo) -> OverviewMetrics:
    # 접근 제어
    if current_user.role not in (UserRole.Admin, UserRole.Manager) or current_user.allow != UserAllowed.Approved :
        raise AdminPermissionDeniedError

    return OverviewMetrics(
        members=select_Overview_member(db=db),
        views=select_Overview_posts(db=db),
        comments=select_Overview_comments(db=db),
        likes=select_Overview_likes(db=db)
    )

# 전체 회원 수
# 최근 1주일 회원수
def select_Overview_member(db: Session) -> Metric:
    week_ago = datetime.now(timezone.utc) - timedelta(days=7)

    stmt = select(
        func.count(UserInfo.user_id).label("total"),
        func.count(
            case(
                (UserInfo.joined_at >= week_ago, 1)
            )
        ).label("weeklyIncrease")
    ).where(
        UserInfo.allow != UserAllowed.Rejected,
        UserInfo.role == UserRole.Member
    )

    result = db.execute(stmt).one()
    print("member :", result)
    return Metric(
        total=result.total,
        weeklyIncrease=result.weeklyIncrease
    )

# 게시글 조회
# 최근 1주일 조회수
def select_Overview_posts(db: Session) -> Metric:
    week_ago = datetime.now(timezone.utc) - timedelta(days=7)

    stmt = select(
        func.count(Festival_Views.id).label("total"),
        func.count(
            case(
                (Festival_Views.viewed_at >= week_ago, 1)
            )
        ).label("weeklyIncrease")
    )

    result = db.execute(stmt).one()
    print("posts :", result)
    return Metric(
        total=result.total,
        weeklyIncrease=result.weeklyIncrease
    )

# 전체 댓글
# 최근 1주일 댓글수
def select_Overview_comments(db: Session) -> Metric:
    week_ago = datetime.now(timezone.utc) - timedelta(days=7)

    stmt = select(
        func.count(Comment.comment_id).label("total"),
        func.count(
            case(
                (Comment.updated_at >= week_ago, 1)
            )
        ).label("weeklyIncrease")
    ).where(
        Comment.is_delete == False
    )

    result = db.execute(stmt).one()
    print("comments :", result)
    return Metric(
        total=result.total,
        weeklyIncrease=result.weeklyIncrease
    )

# 전체 좋아요
# 최근 1주일 좋아요수 >> 날짜 입력 x로 미구현
def select_Overview_likes(db: Session) -> Metric:
    # week_ago = datetime.now(timezone.utc) - timedelta(days=7)

    stmt = select(
        func.count(FestivalLikes.like_id).label("total")
    )

    result = db.execute(stmt).one()
    print("likes :", result)
    return Metric(
        total=result.total,
        weeklyIncrease=0
    )


def select_DailyActivity(db: Session, current_user:UserInfo) -> list[DailyActivity]:
    # 접근 제어
    if current_user.role not in (UserRole.Admin, UserRole.Manager) or current_user.allow != UserAllowed.Approved :
        raise AdminPermissionDeniedError

    today = datetime.now().date()
    start_date = today - timedelta(days=6)

    joined_date = func.trunc(UserInfo.joined_at)

    stmt = (
        select(
            joined_date.label("date"),
            func.count(UserInfo.user_id).label("newMembers")
        )
        .where(
            UserInfo.joined_at >= start_date,
            UserInfo.allow != UserAllowed.Rejected,
            UserInfo.role == UserRole.Member
        )
        .group_by(joined_date)
        .order_by(joined_date)
    )

    member_result = db.execute(stmt).all()

    created_date = func.trunc(Comment.created_at)
    
    stmt = (
        select(
            created_date.label("date"),
            func.count(Comment.comment_id).label("newComments")
        )
        .where(
            Comment.created_at >= start_date,
            Comment.is_delete == False
        )
        .group_by(created_date)
        .order_by(created_date)
    )

    comment_result = db.execute(stmt).all()

    member_dict = {
        row.date.date(): row.newMembers
        for row in member_result
    }

    comment_dict = {
        row.date.date(): row.newComments
        for row in comment_result
    }

    return [
        DailyActivity(
            date=(start_date + timedelta(days=i)).isoformat(),
            newMembers=member_dict.get(start_date + timedelta(days=i), 0),
            newComments=comment_dict.get(start_date + timedelta(days=i), 0)
        )
        for i in range(7)
    ]


class Populoar_post_criteria(str, Enum):
    VIEWS = "views"
    LIKES = "likes"
    COMMENTS = "comments"

def select_PopularPost(db: Session, current_user:UserInfo, data:str) -> list[PopularPost]:
    # 접근 제어
    if current_user.role not in (UserRole.Admin, UserRole.Manager) or current_user.allow != UserAllowed.Approved :
        raise AdminPermissionDeniedError

    today = datetime.now().date().strftime("%Y%m%d")

    # 조회수 순
    if data == Populoar_post_criteria.VIEWS :
        stmt = (
            select(
                Festival.id,
                Festival.title,
                Festival.views
            )
            .where(Festival.is_public == True, Festival.is_delete == False, Festival.enddate >= today)
            .order_by(Festival.views.desc())
            .limit(5)
        )
        results = db.execute(stmt).all()
        return [
                PopularPost(
                    id = result.id,
                    title = result.title,
                    views = result.views,
                    likes=0,
                    comments=0
                )
                for result in results
            ]

    # 좋아요 순
    elif data == Populoar_post_criteria.LIKES :
        stmt = (
            select(
                Festival.id,
                Festival.title,
                Festival.views,
                func.count(FestivalLikes.like_id).label("likes")
            )
            .outerjoin(Festival.likes)
            .where(Festival.is_public == True, Festival.is_delete == False, Festival.enddate >= today)
            .group_by(Festival.id, Festival.title, Festival.views)
            .order_by(desc("likes"),Festival.views.desc())
            .limit(5)
        )
        results = db.execute(stmt).all()
        return [
                PopularPost(
                    id = result.id,
                    title = result.title,
                    views = result.views,
                    likes = result.likes,
                    comments = 0
                )
                for result in results
            ]

    # 댓글 순
    elif data == Populoar_post_criteria.COMMENTS :
        stmt = (
            select(
                Festival.id,
                Festival.title,
                Festival.views,
                func.count(Comment.comment_id).label("comments")
            )
            .outerjoin(Festival.comments)
            .where(Festival.is_public == True, Festival.is_delete == False, Festival.enddate >= today)
            .group_by(Festival.id, Festival.title, Festival.views)
            .order_by(desc("comments"),Festival.views.desc())
            .limit(5)
        )
        results = db.execute(stmt).all()
        return [
            PopularPost(
                id = result.id,
                title = result.title,
                views = result.views,
                likes = 0,
                comments = result.comments
            )
            for result in results
        ]


    return [
        PopularPost(
            id = 0,
            title = 0,
            views = 0,
            likes=0,
            comments=0
        )
        for i in range(5)
    ]

