from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from core.security import verify_access_token
from db.database import get_db
from db.models.userinfo import UserInfo
from userinfo.exceptions.userinfo import UserNotFoundException, UserCredentialsException
from userinfo.services.userinfo import get_user


security = HTTPBearer()

def get_current_user(credentials:HTTPAuthorizationCredentials=Depends(security), db:Session = Depends(get_db)) :
    token = credentials.credentials
    payload = verify_access_token(token)
    user_id = payload.get("sub")

    if user_id is None :
        raise UserCredentialsException

    return get_user(db=db,user_id=user_id)