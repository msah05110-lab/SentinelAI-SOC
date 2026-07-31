from uuid import UUID

from pydantic import BaseModel, EmailStr, ConfigDict


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr
    is_active: bool

    model_config = ConfigDict(from_attributes=True)


class CurrentUserResponse(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr
    is_active: bool
    role: str

    model_config = ConfigDict(from_attributes=True)