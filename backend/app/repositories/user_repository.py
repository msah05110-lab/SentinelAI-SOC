from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:
    """
    Repository class for all User database operations.
    """

    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str) -> User | None:
        """
        Get a user by email.
        """
        return (
            self.db.query(User)
            .filter(User.email == email)
            .first()
        )

    def create(self, user: User) -> User:
        """
        Save a new user to the database.
        """
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def get_by_id(self, user_id) -> User | None:
        """
        Get a user by ID.
        """
        return (
            self.db.query(User)
            .filter(User.id == user_id)
            .first()
        )