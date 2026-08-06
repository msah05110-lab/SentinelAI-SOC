from fastapi import APIRouter

from app.api.v1.endpoints import health
from app.api.v1.endpoints import database
from app.api.v1.endpoints import auth
from app.api.v1.endpoints import upload
from app.api.v1.endpoints import incident
from app.api.v1.endpoints import dashboard
from app.api.v1.endpoints import history
from app.api.v1.endpoints import analytics   # 👈 NEW


api_router = APIRouter()


api_router.include_router(
    health.router,
    tags=["Health"]
)

api_router.include_router(
    database.router,
    tags=["Database"]
)

api_router.include_router(
    auth.router
)

api_router.include_router(
    upload.router
)

api_router.include_router(
    incident.router,
    tags=["Incidents"]
)

api_router.include_router(
    dashboard.router,
    tags=["Dashboard"]
)

api_router.include_router(
    history.router,
    tags=["History"]
)

api_router.include_router(
    analytics.router,
    tags=["Analytics"]
)