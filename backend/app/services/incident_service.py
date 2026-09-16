from sqlalchemy.orm import Session

from app.repositories.incident_repository import IncidentRepository


class IncidentService:

    def __init__(self):
        self.repository = IncidentRepository()

    # ----------------------------------------
    # Create Incident
    # ----------------------------------------

    def create_incident(
        self,
        db: Session,
        incident
    ):
        return self.repository.create(
            db,
            incident
        )

    # ----------------------------------------
    # Get All Incidents
    # ----------------------------------------

    def get_all_incidents(
        self,
        db: Session
    ):
        return self.repository.get_all(db)

    # ----------------------------------------
    # Get Single Incident
    # ----------------------------------------

    def get_incident(
        self,
        db: Session,
        incident_id: int
    ):
        return self.repository.get_by_id(
            db,
            incident_id
        )

    # ----------------------------------------
    # Dashboard Statistics
    # ----------------------------------------

    def count_incidents(
        self,
        db: Session
    ):
        return self.repository.count(db)

    def get_recent_incidents(
        self,
        db: Session,
        limit: int = 10
    ):
        return self.repository.get_recent(
            db,
            limit
        )

    def count_by_severity(
        self,
        db: Session,
        severity: str
    ):
        return self.repository.count_by_severity(
            db,
            severity
        )

    # ----------------------------------------
    # Delete Incident
    # ----------------------------------------

    def delete_incident(
        self,
        db: Session,
        incident_id: int
    ):
        incident = self.repository.get_by_id(
            db,
            incident_id
        )

        if not incident:
            return None

        self.repository.delete(
            db,
            incident
        )

        return True