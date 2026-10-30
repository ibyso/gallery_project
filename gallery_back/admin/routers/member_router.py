from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from db.database import get_db
from db.models.userinfo import UserInfo
from core.dependencies import get_current_user
from admin.schemas.member import MemberPageResponse, MemberSearchParams
from admin.services.member import select_all_member, update_allow_member
from admin.exceptions.admin_userinfo import AdminInvalidAllowedException, AdminPermissionDeniedError
from userinfo.exceptions.userinfo import UserNotFoundException

from typing import Annotated

admin_member_router = APIRouter(tags=["Admin_members"])

# 회원 목록 조회
@admin_member_router.get("", response_model=MemberPageResponse)
async def get_members(
    data : Annotated[MemberSearchParams, Query()],
    current_user:UserInfo=Depends(get_current_user), 
    db: Session = Depends(get_db)
    ):

    if current_user.role not in ["Admin","Manager"] or current_user.allow != "Approved" :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="조회 권한이 없습니다.",
        )
    result = select_all_member(db=db, data=data, current_user=current_user)

    return result

# 관리자 승인 갱신
@admin_member_router.patch("/{user_id}/{allow_status}", response_model=dict)
async def patch_member(user_id:int, allow_status:str, current_user:UserInfo=Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        update_allow_member(db=db,user_id=user_id,allow_status=allow_status,current_user=current_user)

    except UserNotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="유효하지 않는 사용자입니다.")
    
    except AdminInvalidAllowedException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST ,
            detail="유효하지 않은 요청입니다.",
        )
    except AdminPermissionDeniedError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="권한이 없습니다.",
        )

    return {"message": "접근 권한이 변경되었습니다"}