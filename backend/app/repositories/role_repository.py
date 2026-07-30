from sqlalchemy.orm import Session

from app.models.role import Role


class RoleRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_by_name(self, role_name: str):
        return (
            self.db.query(Role)
            .filter(Role.role_name == role_name)
            .first()
        )