from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from ..schemas.comment_schemas import CommentCreate
from ..services.comment_services import comment_create
from db.database import get_db

comment_router = APIRouter(tags=["Comments"])

# 게시글 등록
@comment_router.post("")
async def post_comment(data: CommentCreate, db: Session = Depends(get_db)):
    comment = comment_create(data=data, db=db)

    return {"message": f"comment {comment.comment_id} 번 등록 성공"}