from sqlalchemy.orm import Session

from app.repositories.incident_repository import IncidentRepository


class IncidentHistoryService:

    def __init__(self):
        self.repository = IncidentRepository()

    # ========================================================
    # GET ALL INCIDENTS FOR CURRENT USER
    # ========================================================

    def get_all(
        self,
        db: Session,
        user_id
    ):
        """
        Get all incidents belonging to the current user,
        ordered by newest first.
        """
        return self.repository.get_all(
            db,
            user_id=user_id
        )

    # ========================================================
    # GET SINGLE INCIDENT FOR CURRENT USER
    # ========================================================

    def get_by_id(
        self,
        db: Session,
        incident_id: int,
        user_id
    ):
        """
        Get a single incident only if it belongs
        to the current user.
        """
        return self.repository.get_by_id(
            db,
            incident_id,
            user_id=user_id
        )

    # ========================================================
    # DELETE INCIDENT FOR CURRENT USER
    # ========================================================

    def delete(
        self,
        db: Session,
        incident_id: int,
        user_id
    ):
        """
        Delete an incident only if it belongs
        to the current user.

        Returns:
            True  -> incident deleted
            False -> incident not found or not owned
        """

        incident = self.repository.get_by_id(
            db,
            incident_id,
            user_id=user_id
        )

        if incident is None:
            return False

        self.repository.delete(
            db,
            incident
        )

        return True