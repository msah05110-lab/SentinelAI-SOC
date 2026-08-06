from sqlalchemy.orm import Session

from app.repositories.incident_repository import IncidentRepository


class DashboardService:

    def __init__(self):

        self.repo = IncidentRepository()


    def get_dashboard(
        self,
        db: Session
    ):

        return {

            "total_incidents":
                self.repo.count(db),

            "critical":
                self.repo.count_by_severity(
                    db,
                    "Critical"
                ),

            "high":
                self.repo.count_by_severity(
                    db,
                    "High"
                ),

            "medium":
                self.repo.count_by_severity(
                    db,
                    "Medium"
                ),

            "low":
                self.repo.count_by_severity(
                    db,
                    "Low"
                ),

            "recent":
                self.repo.get_recent(db)

        }