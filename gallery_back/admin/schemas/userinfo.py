from pydantic import BaseModel, EmailStr, Field, AfterValidator, ConfigDict
from typing import Annotated
from db.models.userinfo import Gender
import re


# 허용할 특수문자
SPECIAL_CHARS = "@!$*-"


# 비밀번호 복잡도 검사
def validate_password_strength(v: str) -> str:
    if not re.search(r"[A-Z]", v):
        raise ValueError("대문자를 1자 이상 포함해야 합니다.")

    if not re.search(r"[a-z]", v):
        raise ValueError("소문자를 1자 이상 포함해야 합니다.")

    if not re.search(r"\d", v):
        raise ValueError("숫자를 1자 이상 포함해야 합니다.")

    if not any(c in SPECIAL_CHARS for c in v):
        raise ValueError(
            f"특수문자({SPECIAL_CHARS})를 1자 이상 포함해야 합니다."
        )

    return v


# 비밀번호 타입
Password = Annotated[
    str,
    Field(min_length=8, max_length=64),
    AfterValidator(validate_password_strength),
]


# 회원가입 요청 데이터
class UserInfoCreate(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=30)
    password: Password
    age: int | None = Field(None, ge=0, le=120)
    gender: Gender | None = None


# 회원가입 응답 데이터
class UserInfoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    user_id: int
    email: EmailStr
    name: str
    role : str
    allow :str

# 로그인 요청 데이터
class UserInfoLogin(BaseModel):
    email: EmailStr
    password: str

# 비밀번호 변경 요청 데이터
class UserInfoPasswordChange(BaseModel):
    current_password: str
    new_password: Password


# 로그인 성공 시 반환할 JWT 토큰 데이터
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"