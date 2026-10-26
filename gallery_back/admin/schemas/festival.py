from pydantic import BaseModel, Field, ConfigDict, field_validator
from datetime import datetime, date
from enum import Enum

from userinfo.schemas.userinfo import UserInfoResponse


class SearchCriteria(str, Enum):
    ALL = ""
    TITLE = "title"
    ADDR = "addr"

class CommentResponse(BaseModel):
    comment_id: int
    body: str
    user_id: int
    # 댓글 작성자 정보
    user: UserInfoResponse
    content_id: int
    created_at: datetime
    updated_at: datetime

class FestivalResponse(BaseModel):
    # festivals pydantic 모델을 해당 모델로 변환 허용
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    addr1: str
    addr2: str | None = None
    startdate: datetime | None = None
    enddate: datetime | None = None
    thumbnail : str | None = None
    tel : str | None = None
    zipcode : int | None = None
    homepage : str | None = None
    overview : str | None = None
    playtime : str | None = None
    eventplace : str | None = None
    posted_at : datetime | None = None
    is_public : bool | None = None
    is_delete : bool | None = None
    program : str | None = None
    comments : list[CommentResponse]

    @field_validator("startdate", "enddate", mode="before")
    @classmethod
    def parse_date(cls, value):
        if value is None or value == "":
            return None

        if isinstance(value, str):
            return datetime.strptime(value, "%Y%m%d")

        return value


class FestivalPageResponse(BaseModel):
    items: list[FestivalResponse]
    total: int
    page: int
    size: int
    total_pages: int
    criteria : str | None = None
    keyword : str | None = None
    start_date : date | None = None
    end_date : date | None = None
    is_public : bool | None = None
    is_delete : bool | None = None


class FestivalSearchParams(BaseModel):
    # 기본 검색
    criteria: str | None = None
    keyword: str | None = None

    # 상세 검색
    is_public : bool | None = None
    is_delete : bool | None = None
    start_date: date | None = None
    end_date: date | None = None

    # 페이지네이션
    page: int = Field(default=1, ge=1)
    size: int = Field(default=10, ge=1, le=100)
