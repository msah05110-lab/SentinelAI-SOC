from sqlalchemy.orm import Session

from app.repositories.incident_repository import IncidentRepository


class TrendService:

    def __init__(self):
        self.repository = IncidentRepository()

    def recent(
        self,
        db: Session,
        user_id
    ):

        incidents = self.repository.get_recent(
            db,
            limit=7,
            user_id=user_id
        )

        return [
            {
                "id": incident.id,
                "filename": incident.filename,
                "severity": incident.severity,
                "created_at": incident.created_at,
            }
            for incident in incidents
        ]