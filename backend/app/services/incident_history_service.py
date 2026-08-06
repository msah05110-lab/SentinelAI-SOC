from sqlalchemy.orm import Session

from app.repositories.incident_repository import IncidentRepository


class IncidentHistoryService:

    def __init__(self):
        self.repository = IncidentRepository()

    def get_all(
        self,
        db: Session
    ):
        """
        Get all incidents ordered by newest first.
        """
        return self.repository.get_all(db)

    def get_by_id(
        self,
        db: Session,
        incident_id: int
    ):
        """
        Get a single incident by its ID.
        """
        return self.repository.get_by_id(
            db,
            incident_id
        )

    def delete(
        self,
        db: Session,
        incident_id: int
    ):
        """
        Delete an incident by ID.
        Returns True if deleted, otherwise False.
        """

        incident = self.repository.get_by_id(
            db,
            incident_id
        )

        if incident is None:
            return False

        self.repository.delete(
            db,
            incident
        )

        return True