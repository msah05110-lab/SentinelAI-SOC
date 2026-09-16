from sqlalchemy.orm import Session

from app.repositories.incident_repository import IncidentRepository


class StatisticsService:

    def __init__(self):
        self.repository = IncidentRepository()

    def total_incidents(
        self,
        db: Session,
        user_id
    ) -> int:

        return self.repository.count(
            db,
            user_id=user_id
        )