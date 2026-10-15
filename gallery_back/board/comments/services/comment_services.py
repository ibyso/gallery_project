from sqlalchemy.orm import Session
from ..schemas.comment_schemas import CommentCreate, CommentUpdate



def comment_create(data: CommentCreate, db: Session):
    pass