from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime, date
from enum import Enum

from db.models.userinfo import UserAllowed

class SearchCriteria(str, Enum):
    ALL = ""
    EMAIL = "email"
    NAME = "name"

class AdminResponse(BaseModel):
    # UserInfo pydantic 모델을 해당 모델로 변환 허용
    model_config = ConfigDict(from_attributes=True)

    user_id: int
    name: str
    email: str
    gender : str
    joined_at: datetime
    updated_at: datetime
    role : str
    allow : str


class AdminPageResponse(BaseModel):
    items: list[AdminResponse]
    total: int
    page: int
    size: int
    total_pages: int
    criteria : str | None = None
    keyword : str | None = None
    start_date : date | None = None
    end_date : date | None = None
    isAllow : str | None = None


class AdminSearchParams(BaseModel):
    # 기본 검색
    criteria: str | None = None
    keyword: str | None = None

    # 상세 검색
    isAllow: str | None = None
    start_date: date | None = None
    end_date: date | None = None

    # 페이지네이션
    page: int = Field(default=1, ge=1)
    size: int = Field(default=10, ge=1, le=100)


class AdminAllowedApprove(BaseModel) :
    user_id: int
    status : UserAllowed