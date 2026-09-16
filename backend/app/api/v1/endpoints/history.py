from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.history import (
    HistoryListResponse,
    HistoryResponse,
)

from app.services.incident_history_service import (
    IncidentHistoryService,
)

from app.dependencies.auth import get_current_user
from app.models.user import User


router = APIRouter(
    prefix="/history",
    tags=["History"],
    dependencies=[
        Depends(get_current_user)
    ],
)


service = IncidentHistoryService()


# ============================================================
# GET ALL HISTORY FOR CURRENT USER
# ============================================================

@router.get(
    "/",
    response_model=HistoryListResponse,
)
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    incidents = service.get_all(
        db,
        user_id=current_user.id,
    )

    return {
        "incidents": incidents
    }


# ============================================================
# GET SINGLE INCIDENT HISTORY
# ============================================================

@router.get(
    "/{incident_id}",
    response_model=HistoryResponse,
)
def get_incident(
    incident_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    incident = service.get_by_id(
        db,
        incident_id,
        user_id=current_user.id,
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return incident


# ============================================================
# DELETE INCIDENT HISTORY
# ============================================================

@router.delete(
    "/{incident_id}",
)
def delete_incident(
    incident_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = service.delete(
        db,
        incident_id,
        user_id=current_user.id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return {
        "message": "Incident deleted successfully"
    }