from sqlalchemy.orm import Session

from app.analytics.statistics_service import StatisticsService
from app.analytics.severity_service import SeverityService
from app.analytics.trend_service import TrendService


class AnalyticsService:

    def __init__(self):
        self.statistics = StatisticsService()
        self.severity = SeverityService()
        self.trend = TrendService()

    # ============================================================
    # ANALYTICS SUMMARY
    # ============================================================

    def summary(
        self,
        db: Session,
        user_id
    ) -> dict:

        return {
            "total": self.statistics.total_incidents(
                db,
                user_id=user_id
            ),
            "critical": self.severity.critical(
                db,
                user_id=user_id
            ),
            "high": self.severity.high(
                db,
                user_id=user_id
            ),
            "medium": self.severity.medium(
                db,
                user_id=user_id
            ),
            "low": self.severity.low(
                db,
                user_id=user_id
            )
        }

    # ============================================================
    # RECENT INCIDENTS
    # ============================================================

    def recent_incidents(
        self,
        db: Session,
        user_id
    ) -> dict:

        return {
            "incidents": self.trend.recent(
                db,
                user_id=user_id
            )
        }

    # ============================================================
    # SEVERITY DISTRIBUTION
    # ============================================================

    def severity_distribution(
        self,
        db: Session,
        user_id
    ) -> dict:

        return self.severity.distribution(
            db,
            user_id=user_id
        )