from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from db.database import get_db
from db.models.userinfo import UserInfo
from core.dependencies import get_current_user

from admin.services.comment import select_all_comments, delete_comment
from admin.schemas.comment import CommentSearchParams
from admin.schemas.festival_comment import CommentPageResponse
from admin.exceptions.admin_userinfo import AdminPermissionDeniedError

from typing import Annotated

admin_comment_router = APIRouter(tags=["Admin_comments"])

# 전체 목록 조회
@admin_comment_router.get("", response_model=CommentPageResponse)
async def get_comments(
    data : Annotated[CommentSearchParams, Query()],
    current_user:UserInfo=Depends(get_current_user), 
    db: Session = Depends(get_db)
    ):

    if current_user.role not in ["Admin","Manger"] or current_user.allow != "Approved" :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="조회 권한이 없습니다.",
        )
    result = select_all_comments(db=db, data=data, current_user=current_user)

    return result

# 게시글 활성/비활성
@admin_comment_router.patch("/{id}/{is_delete}", response_model=dict)
async def patch_admins(id:int, is_delete:bool, current_user:UserInfo=Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        delete_comment(db=db,id=id,is_delete=is_delete,current_user=current_user)

    except AdminPermissionDeniedError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="권한이 없습니다.",
        )

    if is_delete :
        message = "댓글이 삭제되었습니다"
    else :
        message = "댓글이 복구되었습니다"

    return {"message": message}