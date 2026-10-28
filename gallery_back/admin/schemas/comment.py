from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime, date
from enum import Enum

# from admin.schemas.festival import FestivalResponse
from admin.schemas.userinfo import UserInfoResponse


class CommentSearchCriteria(str, Enum):
    ALL = ""
    NAME = "name"
    BODY = "body"
    USER_ID = "user_id"
    FESTIVAL_ID = "festival_id"

class CommentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    comment_id: int
    body: str
    user_id: int
    # 댓글 작성자 정보
    user: UserInfoResponse = Field(validation_alias="userInfo")
    # festivals: FestivalResponse
    content_id: int
    created_at: datetime
    updated_at: datetime
    is_delete: bool


# class CommentPageResponse(BaseModel):
#     items: list[CommentResponse]
#     total: int
#     page: int
#     size: int
#     total_pages: int
#     criteria : str | None = None
#     keyword : str | None = None
#     start_date : date | None = None
#     end_date : date | None = None


class CommentSearchParams(BaseModel):
    # 기본 검색
    criteria: str | None = None
    keyword: str | None = None

    # 상세 검색
    start_date: date | None = None
    end_date: date | None = None

    # 페이지네이션
    page: int = Field(default=1, ge=1)
    size: int = Field(default=10, ge=1, le=100)