from sqlalchemy.orm import Session

from app.repositories.incident_repository import IncidentRepository


class SeverityService:

    def __init__(self):
        self.repository = IncidentRepository()

    def critical(
        self,
        db: Session,
        user_id
    ) -> int:

        return self.repository.count_by_severity(
            db,
            "Critical",
            user_id=user_id
        )

    def high(
        self,
        db: Session,
        user_id
    ) -> int:

        return self.repository.count_by_severity(
            db,
            "High",
            user_id=user_id
        )

    def medium(
        self,
        db: Session,
        user_id
    ) -> int:

        return self.repository.count_by_severity(
            db,
            "Medium",
            user_id=user_id
        )

    def low(
        self,
        db: Session,
        user_id
    ) -> int:

        return self.repository.count_by_severity(
            db,
            "Low",
            user_id=user_id
        )

    def distribution(
        self,
        db: Session,
        user_id
    ) -> dict:

        return {
            "critical": self.critical(db, user_id),
            "high": self.high(db, user_id),
            "medium": self.medium(db, user_id),
            "low": self.low(db, user_id)
        }