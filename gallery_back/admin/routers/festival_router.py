from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from db.database import get_db
from db.models.userinfo import UserInfo
from core.dependencies import get_current_user
from db.models.festival import Festival
from admin.services.festival import select_all_festivals, update_festival_public
from admin.schemas.festival import FestivalSearchParams
from admin.schemas.festival_comment import FestivalPageResponse
from admin.exceptions.admin_userinfo import AdminPermissionDeniedError

from typing import Annotated

admin_festival_router = APIRouter(tags=["Admin_festivals"])

# 전체 목록 조회
@admin_festival_router.get("", response_model=FestivalPageResponse)
async def get_admins(
    data : Annotated[FestivalSearchParams, Query()],
    current_user:UserInfo=Depends(get_current_user), 
    db: Session = Depends(get_db)
    ):

    if current_user.role not in ["Admin","Manger"] or current_user.allow != "Approved" :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="조회 권한이 없습니다.",
        )
    result = select_all_festivals(db=db, data=data, current_user=current_user)

    return result

# 게시글 활성/비활성
@admin_festival_router.patch("/{id}/{is_public}", response_model=dict)
async def patch_admins(id:int, is_public:bool, current_user:UserInfo=Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        update_festival_public(db=db,id=id,is_public=is_public,current_user=current_user)

    except AdminPermissionDeniedError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="권한이 없습니다.",
        )

    return {"message": "게시글 공개여부가 변경되었습니다"}