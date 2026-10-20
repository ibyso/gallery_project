from sqlalchemy.orm import Session
from ..schemas.comment_schemas import CommentCreate, CommentUpdate
from db.models.comment import Comment
from ..exceptions.comment_exception import CommentNotFoundException
from sqlalchemy import select


# 댓글 작성
def comment_create(data: CommentCreate, db: Session):
    comment = Comment(body=data.body, user_id=data.user_id, content_id=data.content_id)

    db.add(comment)
    db.commit()
    db.refresh(comment)

    return comment


# 댓글 조회
def get_comments_by_content_id(content_id: int, db: Session):
    stmt = select(Comment).where(Comment.content_id == content_id).order_by(Comment.created_at.asc())
    comments = db.scalars(stmt).all()

    return [
        {
            "comment_id": comment.comment_id,
            "content_id": comment.content_id,
            "user_id": comment.user_id,
            "body": comment.body,
            "created_at": comment.created_at,
            "updated_at": comment.updated_at,
        }
        for comment in comments
    ]


# 댓글 수정
def update_comment(comment_id: int, data: CommentUpdate, db: Session):
    comment = db.get(Comment, comment_id)

    if comment is None:
        raise CommentNotFoundException

    if data.body is not None:
        comment.body = data.body

    db.commit()

    return comment_id


# 댓글 삭제
def delete_comment_service(comment_id: int, db: Session):
    comment = db.get(Comment, comment_id)

    if comment is None:
        raise CommentNotFoundException

    db.delete(comment)
    db.commit()