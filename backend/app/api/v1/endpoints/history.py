from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.history import (
    HistoryListResponse,
    HistoryResponse
)

from app.services.incident_history_service import (
    IncidentHistoryService
)

router = APIRouter(
    prefix="/history",
    tags=["History"]
)

service = IncidentHistoryService()


@router.get(
    "/",
    response_model=HistoryListResponse
)
def get_history(
    db: Session = Depends(get_db)
):

    incidents = service.get_all(db)

    return {
        "incidents": incidents
    }


@router.get(
    "/{incident_id}",
    response_model=HistoryResponse
)
def get_incident(
    incident_id: int,
    db: Session = Depends(get_db)
):

    incident = service.get_by_id(
        db,
        incident_id
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return incident


@router.delete(
    "/{incident_id}"
)
def delete_incident(
    incident_id: int,
    db: Session = Depends(get_db)
):

    deleted = service.delete(
        db,
        incident_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return {
        "message": "Incident deleted successfully"
    }