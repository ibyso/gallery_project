from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from ..schemas.comment_schemas import CommentCreate, CommentUpdate
from ..services.comment_services import (
    comment_create,
    update_comment,
    delete_comment_service,
    get_comments_by_content_id,
)
from db.database import get_db
from ..exceptions.comment_exception import CommentNotFoundException
from db.models.userinfo import UserInfo
from core.dependencies import get_current_user

comment_router = APIRouter(tags=["Comments"])

# 댓글 등록
@comment_router.post("", response_model=dict)
async def post_comment(data: CommentCreate, db: Session = Depends(get_db), current_user: UserInfo = Depends(get_current_user)):
    comment = comment_create(data=data, db=db)

    return {"message": f"comment {comment.comment_id} 번 등록 성공"}


# 댓글 조회
@comment_router.get("", response_model=list[dict])
async def get_comments(content_id: int, db:  Session = Depends(get_db)):
    comments = get_comments_by_content_id(content_id=content_id, db=db)

    return comments


# 댓글 수정
@comment_router.put("/{comment_id}", response_model=dict)
async def put_comment(comment_id: int, data: CommentUpdate, db: Session = Depends(get_db), current_user: UserInfo = Depends(get_current_user)):
    try:
        id = update_comment(comment_id=comment_id, data=data, db=db, current_user_id=current_user.user_id)
    except CommentNotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="수정할 댓글이 없습니다.")

    return {"message": f"comment {id} 번 수정 성공"}


# 댓글 삭제
@comment_router.delete("/{comment_id}", response_model=dict)
async def delete_comment(comment_id: int, db: Session = Depends(get_db), current_user: UserInfo = Depends(get_current_user)):
    try:
        delete_comment_service(comment_id=comment_id, db=db, current_user_id=current_user.user_id)
    except CommentNotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="삭제할 댓글이 없습니다.")

    return {"message": f"comment {comment_id} 번 삭제 성공"}
