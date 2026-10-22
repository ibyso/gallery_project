from fastapi import Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from db.database import get_db
from db.models.userinfo import UserInfo
from core.dependencies import get_current_user
from admin.schemas.admin import AdminPageResponse, AdminSearchParams
from admin.services.admin import select_all_admin, update_allow_admin
from admin.exceptions.admin_userinfo import AdminInvalidAllowedException, AdminPermissionDeniedError
from userinfo.exceptions.userinfo import UserNotFoundException

from typing import Annotated

from admin.routers.userinfo_router import admin_user_router

# 회원 목록 조회
@admin_user_router.get("", response_model=AdminPageResponse)
async def get_admins(
    data : Annotated[AdminSearchParams, Query()],
    current_user:UserInfo=Depends(get_current_user), 
    db: Session = Depends(get_db)
    ):

    if current_user.role not in ["Admin","Manger"] or current_user.allow != "Approved" :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="조회 권한이 없습니다.",
        )
    result = select_all_admin(db=db, data=data)

    return result

# 관리자 승인 갱신
@admin_user_router.patch("/{user_id}/{allow_status}", response_model=dict)
async def get_admins(user_id:int, allow_status:str, current_user:UserInfo=Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        update_allow_admin(db=db,user_id=user_id,allow_status=allow_status,current_user=current_user)

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