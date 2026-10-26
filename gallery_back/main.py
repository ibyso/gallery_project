from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from board.festivalComments.routers.comment_router import comment_router
from admin.routers.migration_router import migration_router
from admin.routers import userinfo_router, admin_router
from admin.routers.userinfo_router import admin_user_router
from admin.routers.member_router import admin_member_router
from admin.routers.festival_router import admin_festival_router
from userinfo.routers.userinfo_router import userinfo_router
from board.festival.routers.festival_router import festival_router
from db.models.festival_likes import FestivalLikes
from userinfo.routers.like_router import like_router
from board.festivalLikes.routers.like_router import like_router


app = FastAPI(title="Galley Project API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(userinfo_router)
app.include_router(festival_router, prefix="/festivals")
app.include_router(comment_router, prefix="/comments")
app.include_router(like_router, prefix="/likes")
app.include_router(admin_user_router, prefix="/admin")
app.include_router(admin_member_router, prefix="/admin/member")
app.include_router(admin_festival_router, prefix="/admin/festivals")
app.include_router(migration_router, prefix="/migration")
