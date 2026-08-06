from sqlalchemy.orm import Session

from app.repositories.incident_repository import IncidentRepository


class SeverityService:

    def __init__(self):
        self.repository = IncidentRepository()

    def critical(
        self,
        db: Session
    ) -> int:

        return self.repository.count_by_severity(
            db,
            "Critical"
        )

    def high(
        self,
        db: Session
    ) -> int:

        return self.repository.count_by_severity(
            db,
            "High"
        )

    def medium(
        self,
        db: Session
    ) -> int:

        return self.repository.count_by_severity(
            db,
            "Medium"
        )

    def low(
        self,
        db: Session
    ) -> int:

        return self.repository.count_by_severity(
            db,
            "Low"
        )

    def distribution(
        self,
        db: Session
    ) -> dict:

        return {
            "critical": self.critical(db),
            "high": self.high(db),
            "medium": self.medium(db),
            "low": self.low(db)
        }