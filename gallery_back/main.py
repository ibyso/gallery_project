from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from board.festivalComments.routers.comment_router import comment_router
from admin.routers.migration_router import migration_router
from userinfo.routers.userinfo_router import userinfo_router  # 추가
from board.festival.routers.festival_router import festival_router

app = FastAPI(title="Galley Project API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(comment_router, prefix="/comments")
app.include_router(migration_router, prefix="/migration")
app.include_router(userinfo_router)
app.include_router(festival_router, prefix="/festivals")