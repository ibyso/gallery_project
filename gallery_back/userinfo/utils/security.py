# 토큰 생성 함수
from core.config import settings
from datetime import datetime, timedelta, timezone
import jwt
from jwt.exceptions import InvalidTokenError
from userinfo.exceptions.userinfo import UserCredentialsException

def verify_access_token(token:str) -> dict:
    """
    jwt 토큰 검증 및 디코딩 후 문자열 반환
    """
    
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=['HS256'])
        return payload
    except InvalidTokenError:
        raise UserCredentialsException

def create_access_token(data:dict, expires_delta:int=3600) -> str:
    """
    jwt 토큰 생성
    data : 토큰에 포함할 데이터(ex: 사용자 정보)
    expires_delta : 토큰 만료시간(초 단위, 기본값 1시간)
    return : 생성된 JWT 토큰 문자열
    """
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(seconds=expires_delta)
    to_encode.update({"exp":expire})

    encode_jwt = jwt.encode(to_encode, settings.secret_key, algorithm="HS256")
    return encode_jwt

from pwdlib import PasswordHash

# 비밀번호 해싱 도구 (Argon2)
password_hash = PasswordHash.recommended()


# 비밀번호를 해시 문자열로 변환
def hash_password(password: str) -> str:
    return password_hash.hash(password)


# 입력한 비밀번호와 저장된 해시 비교
def verify_password(password: str, hashed_password: str) -> bool:
    return password_hash.verify(password, hashed_password)