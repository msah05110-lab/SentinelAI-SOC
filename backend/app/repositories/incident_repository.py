from sqlalchemy.orm import Session

from app.models.incident import Incident


class IncidentRepository:

    def create(
        self,
        db: Session,
        incident: Incident
    ):

        db.add(incident)

        db.commit()

        db.refresh(incident)

        return incident

    def get_all(
        self,
        db: Session
    ):

        return (
            db.query(Incident)
            .order_by(Incident.created_at.desc())
            .all()
        )

    def count(
        self,
        db: Session
    ):

        return (
            db.query(Incident)
            .count()
        )

    def get_recent(
        self,
        db: Session,
        limit: int = 10
    ):

        return (
            db.query(Incident)
            .order_by(Incident.created_at.desc())
            .limit(limit)
            .all()
        )

    def count_by_severity(
        self,
        db: Session,
        severity: str
    ):

        return (
            db.query(Incident)
            .filter(Incident.severity == severity)
            .count()
        )

    # --------------------------------------------------
    # Get Incident By ID
    # --------------------------------------------------

    def get_by_id(
        self,
        db: Session,
        incident_id: int
    ):

        return (
            db.query(Incident)
            .filter(Incident.id == incident_id)
            .first()
        )

    # --------------------------------------------------
    # Delete Incident
    # --------------------------------------------------

    def delete(
        self,
        db: Session,
        incident: Incident
    ):

        db.delete(incident)

        db.commit()

        return True