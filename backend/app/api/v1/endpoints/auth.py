from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.user import (
    UserCreate,
    UserResponse,
    CurrentUserResponse,
)
from app.schemas.login import UserLogin
from app.schemas.token import Token

from app.services.auth_service import (
    get_user_by_email,
    create_user,
    authenticate_user
)

from app.dependencies.auth import get_current_user
from app.models.user import User
from app.core.security import create_access_token


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered."
        )

    return create_user(db, user)


@router.post(
    "/login",
    response_model=Token
)
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    db_user = authenticate_user(
        db,
        user.email,
        user.password
    )

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    return Token(
        access_token=access_token,
        token_type="bearer"
    )


@router.get(
    "/me",
    response_model=CurrentUserResponse
)
def get_me(
    current_user: User = Depends(get_current_user)
):
    return CurrentUserResponse(
        id=current_user.id,
        full_name=current_user.full_name,
        email=current_user.email,
        is_active=current_user.is_active,
        role=current_user.role.role_name
    )