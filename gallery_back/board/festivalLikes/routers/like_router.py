from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from core.dependencies import get_current_user
from db.database import get_db
from db.models.userinfo import UserInfo
from ..services.like_services import add_like, remove_like, get_likes_by_user_id
from ..exceptions.like_exception import LikeNotFoundExcepton, LikeAlreadyExistsException
from ..schemas.like_schemas import AddLike
from userinfo.exceptions.userinfo import UserCredentialsException

like_router = APIRouter(tags=["Likes"])

@like_router.post("/{festival_id}", response_model=dict)
async def post_like(festival_id: int, db: Session = Depends(get_db), current_user: UserInfo = Depends(get_current_user)):

    data = AddLike(festival_id=festival_id, user_id=current_user.user_id)
    try:
        like = add_like(data=data, db=db)
    except LikeAlreadyExistsException:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="이미 좋아요을 누른 축제입니다.")

    return {"message": f"like {like.festival_id} 번 게시물에 등록 성공"}


@like_router.delete("/{like_id}")
async def delete_like(like_id: int, db: Session = Depends(get_db), current_user: UserInfo = Depends(get_current_user)):
    try:
        remove_like(like_id=like_id, user_id=current_user.user_id, db=db)
    except LikeNotFoundExcepton:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="취소할 좋아요를 찾지 못 했습니다.")
    except UserCredentialsException:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="본인의 좋아요만 취소 할 수 있습니다.")

    return {"message": f"like {like_id} 번 좋아요 삭제 성공"}


@like_router.get("/me", response_model=list[dict])
async def get_likes(db: Session = Depends(get_db), current_user: UserInfo = Depends(get_current_user)):
    likes = get_likes_by_user_id(user_id=current_user.user_id, db=db,)

    return likes
