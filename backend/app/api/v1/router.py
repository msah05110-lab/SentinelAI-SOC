from fastapi import APIRouter

from app.api.v1.endpoints import health
from app.api.v1.endpoints import database
from app.api.v1.endpoints import auth
from app.api.v1.endpoints import upload
from app.api.v1.endpoints import incident
from app.api.v1.endpoints import dashboard
from app.api.v1.endpoints import history
from app.api.v1.endpoints import analytics
from app.api.v1.endpoints import reports


api_router = APIRouter()


# ============================================================
# HEALTH
# ============================================================

api_router.include_router(
    health.router,
    tags=["Health"]
)


# ============================================================
# DATABASE
# ============================================================

api_router.include_router(
    database.router,
    tags=["Database"]
)


# ============================================================
# AUTHENTICATION
# ============================================================

api_router.include_router(
    auth.router
)


# ============================================================
# FILE UPLOAD
# ============================================================

api_router.include_router(
    upload.router
)


# ============================================================
# INCIDENTS
# ============================================================

api_router.include_router(
    incident.router,
    tags=["Incidents"]
)


# ============================================================
# DASHBOARD
# ============================================================

api_router.include_router(
    dashboard.router,
    tags=["Dashboard"]
)


# ============================================================
# HISTORY
# ============================================================

api_router.include_router(
    history.router,
    tags=["History"]
)


# ============================================================
# ANALYTICS
# ============================================================

api_router.include_router(
    analytics.router,
    tags=["Analytics"]
)


# ============================================================
# REPORTS
# ============================================================

api_router.include_router(
    reports.router,
    tags=["Reports"]
)