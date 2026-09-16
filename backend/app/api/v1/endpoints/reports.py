from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.dependencies.auth import get_current_user
from app.models.incident import Incident
from app.models.user import User


router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.get("/")
async def get_reports(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    incidents = (
        db.query(Incident)
        .filter(Incident.user_id == current_user.id)
        .order_by(Incident.created_at.desc())
        .all()
    )

    return [
        {
            "id": incident.id,
            "filename": incident.filename,
            "severity": incident.severity,
            "risk_score": incident.risk_score,
            "created_at": incident.created_at,
        }
        for incident in incidents
    ]