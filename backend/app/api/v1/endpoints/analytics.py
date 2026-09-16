from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.analytics.analytics_service import AnalyticsService

from app.schemas.analytics import (
    AnalyticsResponse,
    TrendResponse,
    SeverityDistributionResponse,
)

from app.dependencies.auth import get_current_user
from app.models.user import User


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
    dependencies=[
        Depends(get_current_user)
    ],
)


service = AnalyticsService()


# ============================================================
# ANALYTICS SUMMARY
# ============================================================

@router.get(
    "/summary",
    response_model=AnalyticsResponse,
)
def get_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return service.summary(
        db,
        user_id=current_user.id,
    )


# ============================================================
# RECENT INCIDENT TREND
# ============================================================

@router.get(
    "/recent",
    response_model=TrendResponse,
)
def get_recent(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return service.recent_incidents(
        db,
        user_id=current_user.id,
    )


# ============================================================
# SEVERITY DISTRIBUTION
# ============================================================

@router.get(
    "/severity",
    response_model=SeverityDistributionResponse,
)
def get_severity(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return service.severity_distribution(
        db,
        user_id=current_user.id,
    )