# 회원가입이 승인되지 않은 경우
class AdminNotAcceptException(Exception):
    pass

# 회원가입이 거부된 경우
class AdminRejectException(Exception):
    pass


# 유저를 못 찾을 경우
class UserNotFoundException(Exception):
    pass

# 이미 있는 유저의 경우
class UserAlreadyExistsException(Exception):
    pass

# 비밀번호가 틀리거나 조건을 충족하지 못한 경우
class InvalidPasswordException(Exception):
    pass

# 같은 비밀번호일 경우
class SamePasswordException(Exception):
    pass

# 올바른 사용자가 아닐 경우
class UserCredentialsException(Exception):
    pass