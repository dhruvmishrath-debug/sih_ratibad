from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str
    expires_in: int


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class RegisterUserRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str
    phone: str | None = None
