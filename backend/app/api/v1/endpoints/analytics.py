from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.analytics.analytics_service import AnalyticsService

from app.schemas.analytics import (
    AnalyticsResponse,
    TrendResponse,
    SeverityDistributionResponse,
)

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

service = AnalyticsService()


@router.get(
    "/summary",
    response_model=AnalyticsResponse
)
def get_summary(
    db: Session = Depends(get_db)
):
    return service.summary(db)


@router.get(
    "/recent",
    response_model=TrendResponse
)
def get_recent(
    db: Session = Depends(get_db)
):
    return service.recent_incidents(db)


@router.get(
    "/severity",
    response_model=SeverityDistributionResponse
)
def get_severity(
    db: Session = Depends(get_db)
):
    return service.severity_distribution(db)