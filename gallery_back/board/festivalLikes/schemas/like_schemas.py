from pydantic import BaseModel

class AddLike(BaseModel):
    user_id: int
    festival_id: int

class LikeResponse(BaseModel):
    user_id: int
    festival_id: int
    like_id: int