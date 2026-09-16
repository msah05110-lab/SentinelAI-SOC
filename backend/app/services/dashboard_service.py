from sqlalchemy.orm import Session

from app.repositories.incident_repository import IncidentRepository


class DashboardService:

    def __init__(self):
        self.repo = IncidentRepository()

    def get_dashboard(
        self,
        db: Session,
        user_id
    ):
        return {
            "total_incidents": self.repo.count(
                db,
                user_id=user_id
            ),

            "critical": self.repo.count_by_severity(
                db,
                "Critical",
                user_id=user_id
            ),

            "high": self.repo.count_by_severity(
                db,
                "High",
                user_id=user_id
            ),

            "medium": self.repo.count_by_severity(
                db,
                "Medium",
                user_id=user_id
            ),

            "low": self.repo.count_by_severity(
                db,
                "Low",
                user_id=user_id
            ),

            "average_risk_score": self.repo.average_risk_score(
                db,
                user_id=user_id
            ),

            "highest_risk_score": self.repo.highest_risk_score(
                db,
                user_id=user_id
            ),

            "recent": self.repo.get_recent(
                db,
                user_id=user_id
            )
        }