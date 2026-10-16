from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from ..schemas.comment_schemas import CommentCreate, CommentUpdate
from ..services.comment_services import comment_create, update_comment, delete_comment
from db.database import get_db
from ..exceptions.comment_exception import CommentNotFoundException

comment_router = APIRouter(tags=["Comments"])

# 댓글 등록
@comment_router.post("", response_model=dict)
async def post_comment(data: CommentCreate, db: Session = Depends(get_db)):
    comment = comment_create(data=data, db=db)

    return {"message": f"comment {comment.comment_id} 번 등록 성공"}


# 댓글 수정
@comment_router.put("/{comment_id}", response_model=dict)
async def put_comment(comment_id: int, data: CommentUpdate, db: Session = Depends(get_db)):
    try:
        id = update_comment(comment_id=comment_id, data=data, db=db)
    except CommentNotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="수정할 댓글이 없습니다.")

    return {"message": f"comment {id} 번 수정 성공"}


# 댓글 삭제
@comment_router.delete("/{comment_id}", response_model=dict)
async def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    try:
        delete_comment(comment_id=comment_id, db=db)
    except CommentNotFoundException:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="삭제할 댓글이 없습니다.")

    return {"message": f"comment {comment_id} 번 삭제 성공"}