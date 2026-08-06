from sqlalchemy.orm import Session

from app.analytics.statistics_service import StatisticsService
from app.analytics.severity_service import SeverityService
from app.analytics.trend_service import TrendService


class AnalyticsService:

    def __init__(self):
        self.statistics = StatisticsService()
        self.severity = SeverityService()
        self.trend = TrendService()

    def summary(
        self,
        db: Session
    ) -> dict:

        return {
            "total": self.statistics.total_incidents(db),
            "critical": self.severity.critical(db),
            "high": self.severity.high(db),
            "medium": self.severity.medium(db),
            "low": self.severity.low(db)
        }

    def recent_incidents(
        self,
        db: Session
    ) -> dict:

        return {
            "incidents": self.trend.recent(db)
        }

    def severity_distribution(
        self,
        db: Session
    ) -> dict:

        return self.severity.distribution(db)