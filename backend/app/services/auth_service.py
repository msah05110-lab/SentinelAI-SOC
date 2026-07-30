from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate

from app.core.security import hash_password, verify_password

from app.repositories.user_repository import UserRepository
from app.repositories.role_repository import RoleRepository


def get_user_by_email(db: Session, email: str):
    """
    Get user by email.
    """
    user_repo = UserRepository(db)
    return user_repo.get_by_email(email)


def create_user(db: Session, user_data: UserCreate):
    """
    Create a new user with the default 'SOC Analyst' role.
    """

    user_repo = UserRepository(db)
    role_repo = RoleRepository(db)

    # Get default role
    default_role = role_repo.get_by_name("SOC Analyst")

    if default_role is None:
        raise Exception(
            "Default role 'SOC Analyst' not found. Run the role seeder first."
        )

    # Hash password
    hashed_password = hash_password(user_data.password)

    # Create user object
    user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        password_hash=hashed_password,
        role_id=default_role.id
    )

    return user_repo.create(user)


def authenticate_user(
    db: Session,
    email: str,
    password: str
):
    """
    Authenticate user credentials.
    """

    user_repo = UserRepository(db)

    user = user_repo.get_by_email(email)

    if user is None:
        return None

    if not verify_password(password, user.password_hash):
        return None

    return user