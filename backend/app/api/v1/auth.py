from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import verify_password, create_access_token, create_refresh_token, hash_password
from app.models.user import User, UserRole
from app.schemas.auth import LoginRequest, Token, RegisterUserRequest
from app.core.config import get_settings

router = APIRouter()
settings = get_settings()

@router.post("/login", response_model=Token)
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == request.email))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )

    # In production, we'd check if user is verified based on hospital/pharmacy rules.
    # We generate token payload
    payload = {"sub": str(user.id), "role": user.role, "module": user.module}
    
    access_token = create_access_token(data=payload)
    refresh_token = create_refresh_token(data=payload)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "refresh_token": refresh_token,
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }

@router.post("/register")
async def register(request: RegisterUserRequest, db: AsyncSession = Depends(get_db)):
    # Basic validation
    if request.role not in [r.value for r in UserRole]:
        raise HTTPException(status_code=400, detail="Invalid role")
        
    result = await db.execute(select(User).where(User.email == request.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")
        
    user = User(
        email=request.email,
        hashed_password=hash_password(request.password),
        full_name=request.full_name,
        role=UserRole(request.role),
        phone=request.phone
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    
    return {"message": "User registered successfully. Pending verification.", "id": str(user.id)}
