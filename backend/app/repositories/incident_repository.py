from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.incident import Incident


class IncidentRepository:

    # ============================================================
    # CREATE
    # ============================================================

    def create(
        self,
        db: Session,
        incident: Incident
    ):
        db.add(incident)

        db.commit()

        db.refresh(incident)

        return incident


    # ============================================================
    # GET ALL
    # ============================================================

    def get_all(
        self,
        db: Session,
        user_id=None
    ):
        query = db.query(Incident)

        if user_id is not None:
            query = query.filter(
                Incident.user_id == user_id
            )

        return (
            query
            .order_by(
                Incident.created_at.desc()
            )
            .all()
        )


    # ============================================================
    # GET BY ID
    # ============================================================

    def get_by_id(
        self,
        db: Session,
        incident_id: int,
        user_id=None
    ):
        query = (
            db.query(Incident)
            .filter(
                Incident.id == incident_id
            )
        )

        if user_id is not None:
            query = query.filter(
                Incident.user_id == user_id
            )

        return query.first()


    # ============================================================
    # TOTAL COUNT
    # ============================================================

    def count(
        self,
        db: Session,
        user_id=None
    ):
        query = db.query(Incident)

        if user_id is not None:
            query = query.filter(
                Incident.user_id == user_id
            )

        return query.count()


    # ============================================================
    # RECENT INCIDENTS
    # ============================================================

    def get_recent(
        self,
        db: Session,
        limit: int = 10,
        user_id=None
    ):
        query = db.query(Incident)

        if user_id is not None:
            query = query.filter(
                Incident.user_id == user_id
            )

        return (
            query
            .order_by(
                Incident.created_at.desc()
            )
            .limit(limit)
            .all()
        )


    # ============================================================
    # COUNT BY SEVERITY
    # ============================================================

    def count_by_severity(
        self,
        db: Session,
        severity: str,
        user_id=None
    ):
        query = (
            db.query(Incident)
            .filter(
                Incident.severity == severity
            )
        )

        if user_id is not None:
            query = query.filter(
                Incident.user_id == user_id
            )

        return query.count()


    # ============================================================
    # AVERAGE RISK SCORE
    # ============================================================

    def average_risk_score(
        self,
        db: Session,
        user_id=None
    ) -> float:

        query = db.query(
            func.avg(Incident.risk_score)
        )

        if user_id is not None:
            query = query.filter(
                Incident.user_id == user_id
            )

        result = query.scalar()

        if result is None:
            return 0.0

        return round(
            float(result),
            2
        )


    # ============================================================
    # HIGHEST RISK SCORE
    # ============================================================

    def highest_risk_score(
        self,
        db: Session,
        user_id=None
    ) -> int:

        query = db.query(
            func.max(Incident.risk_score)
        )

        if user_id is not None:
            query = query.filter(
                Incident.user_id == user_id
            )

        result = query.scalar()

        if result is None:
            return 0

        return int(result)


    # ============================================================
    # DELETE
    # ============================================================

    def delete(
        self,
        db: Session,
        incident: Incident
    ):
        db.delete(incident)

        db.commit()

        return True