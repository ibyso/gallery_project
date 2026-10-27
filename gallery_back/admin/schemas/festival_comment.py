from pydantic import BaseModel
from datetime import date

from admin.schemas.festival import FestivalResponse
from admin.schemas.comment import CommentResponse


# FestivalResponse, CommentResponse 순환참조 오류 해결을 위해 구조 변경
# 

class CommentResponseDetail(CommentResponse):
    festivals: FestivalResponse


class CommentPageResponse(BaseModel):
    items: list[CommentResponseDetail]
    total: int
    page: int
    size: int
    total_pages: int
    criteria : str | None = None
    keyword : str | None = None
    start_date : date | None = None
    end_date : date | None = None


class FestivalResponseDetail(FestivalResponse):
    comments : list[CommentResponse]


class FestivalPageResponse(BaseModel):
    items: list[FestivalResponseDetail]
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