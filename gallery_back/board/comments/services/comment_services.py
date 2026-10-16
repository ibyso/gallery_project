from sqlalchemy.orm import Session
from ..schemas.comment_schemas import CommentCreate, CommentUpdate
from db.models.comment import Comment



def comment_create(data: CommentCreate, db: Session):
    comment = Comment()