from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from db.database import get_db
from db.models.userinfo import UserInfo
from core.dependencies import get_current_user

from admin.schemas.dashboard import ManagementCounts, OverviewMetrics, DailyActivity ,PopularPost
from admin.services.dashboard import select_ManagementCounts, select_Overview, select_DailyActivity, select_PopularPost

from typing import Annotated

admin_dashboard_router = APIRouter(tags=["Admin_dashboard"])

# 관리 항목 조회
@admin_dashboard_router.get("/management", response_model=ManagementCounts)
async def get_managementCounts(
    current_user:UserInfo=Depends(get_current_user), 
    db: Session = Depends(get_db)
    ):

    if current_user.role not in ["Admin","Manager"] or current_user.allow != "Approved" :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="조회 권한이 없습니다.",
        )
    result = select_ManagementCounts(db=db, current_user=current_user)

    return result

# 핵심 지표 조회
@admin_dashboard_router.get("/overview", response_model=OverviewMetrics)
async def get_overviewMetrics(
    current_user:UserInfo=Depends(get_current_user), 
    db: Session = Depends(get_db)
    ):

    if current_user.role not in ["Admin","Manager"] or current_user.allow != "Approved" :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="조회 권한이 없습니다.",
        )
    result = select_Overview(db=db, current_user=current_user)

    return result

# 사용자 활동 추이 조회
@admin_dashboard_router.get("/daily", response_model=list[DailyActivity])
async def get_dailyActivity(
    current_user:UserInfo=Depends(get_current_user), 
    db: Session = Depends(get_db)
    ):

    if current_user.role not in ["Admin","Manager"] or current_user.allow != "Approved" :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="조회 권한이 없습니다.",
        )
    result = select_DailyActivity(db=db, current_user=current_user)

    return result

# 사용자 활동 추이 조회
@admin_dashboard_router.get("/popular", response_model=list[PopularPost])
async def get_popularPost(
    data:Annotated[str, Query()],
    current_user:UserInfo=Depends(get_current_user), 
    db: Session = Depends(get_db)
    ):

    if current_user.role not in ["Admin","Manager"] or current_user.allow != "Approved" :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="조회 권한이 없습니다.",
        )
    result = select_PopularPost(db=db, current_user=current_user, data=data)

    return result