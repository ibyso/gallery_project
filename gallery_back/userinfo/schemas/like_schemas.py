from pydantic import BaseModel


# 좋아요 누른 축제 목록 응답 데이터
class LikeFestivalResponse(BaseModel):
    user_id: int
    festival_id: int
    title: str