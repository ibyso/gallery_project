from pydantic import BaseModel

class CommentCreate(BaseModel):
    user_id: int
    content_id: int
    body: str


class CommentUpdate(BaseModel):
    body: str | None = None