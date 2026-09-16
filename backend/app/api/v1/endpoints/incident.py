
from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
)
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os

from app.database.connection import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.models.incident import Incident

from app.incident.incident_service import IncidentService
from app.incident.models import IncidentAnalysis
from app.reports.report_service import ReportService


router = APIRouter(
    prefix="/incidents",
    tags=["Incident Analysis"],
    dependencies=[Depends(get_current_user)],
)

incident_service = IncidentService()
report_service = ReportService()


# ============================================================
# ANALYZE SECURITY LOG
# ============================================================

@router.post("/analyze")
async def analyze_incident(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Filename is missing.",
        )

    try:
        content = await file.read()
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to read uploaded file.",
        )

    if not content:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty.",
        )

    text = content.decode("utf-8", errors="ignore")

    try:
        result = incident_service.analyze(
            text=text,
            db=db,
            filename=file.filename,
            current_user=current_user,
        )

        return {
            "status": "success",
            "message": "Security log analyzed successfully.",
            "incident": result,
        }

    except HTTPException:
        raise

    except Exception as exc:
        print("Incident analysis failed:", exc)
        raise HTTPException(
            status_code=500,
            detail="Incident analysis failed.",
        )


# ============================================================
# GET ALL INCIDENTS FOR CURRENT USER
# ============================================================

@router.get("/")
async def get_incidents(
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
            "ai_summary": incident.ai_summary,
            "created_at": incident.created_at,
            "iocs": incident.iocs,
            "threats": incident.threats,
            "mitre": incident.mitre,
            "recommendations": incident.recommendations,
        }
        for incident in incidents
    ]


# ============================================================
# GET SINGLE INCIDENT FOR CURRENT USER
# ============================================================

@router.get("/{incident_id}")
async def get_incident(
    incident_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    incident = (
        db.query(Incident)
        .filter(
            Incident.id == incident_id,
            Incident.user_id == current_user.id,
        )
        .first()
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found.",
        )

    return {
        "status": "success",
        "incident": {
            "id": incident.id,
            "filename": incident.filename,
            "severity": incident.severity,
            "risk_score": incident.risk_score,
            "ai_summary": incident.ai_summary,
            "created_at": incident.created_at,
            "iocs": incident.iocs,
            "threats": incident.threats,
            "mitre": incident.mitre,
            "recommendations": incident.recommendations,
        },
    }


# ============================================================
# DELETE INCIDENT FOR CURRENT USER
# ============================================================

@router.delete("/{incident_id}")
async def delete_incident(
    incident_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    incident = (
        db.query(Incident)
        .filter(
            Incident.id == incident_id,
            Incident.user_id == current_user.id,
        )
        .first()
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found.",
        )

    try:
        db.delete(incident)
        db.commit()

    except Exception as exc:
        db.rollback()
        print("Incident deletion failed:", exc)
        raise HTTPException(
            status_code=500,
            detail="Failed to delete incident.",
        )

    return {
        "status": "success",
        "message": "Incident deleted successfully.",
        "incident_id": incident_id,
    }


# ============================================================
# GENERATE PDF REPORT FOR CURRENT USER
# ============================================================

@router.post("/report/{incident_id}")
async def generate_report(
    incident_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    incident = (
        db.query(Incident)
        .filter(
            Incident.id == incident_id,
            Incident.user_id == current_user.id,
        )
        .first()
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found.",
        )

    analysis = IncidentAnalysis(
        iocs=(
            incident.iocs
            if isinstance(incident.iocs, dict)
            else {}
        ),
        threats=(
            incident.threats
            if isinstance(incident.threats, list)
            else []
        ),
        mitre=(
            incident.mitre
            if isinstance(incident.mitre, list)
            else []
        ),
        severity=incident.severity,
        risk_score=(
            incident.risk_score
            if incident.risk_score is not None
            else 0
        ),
        ai_summary=(
            incident.ai_summary
            or "No AI summary available."
        ),
        recommendations=(
            incident.recommendations
            if isinstance(incident.recommendations, list)
            else []
        ),
    )

    try:
        filename = f"incident_{incident.id}_report.pdf"

        filepath = report_service.create_report(
            analysis,
            filename=filename,
            incident_id=incident.id,
            incident_filename=incident.filename,
            created_at=incident.created_at,
        )

        if not os.path.exists(filepath):
            raise HTTPException(
                status_code=500,
                detail="PDF file was not created.",
            )

        return FileResponse(
            path=filepath,
            media_type="application/pdf",
            filename=filename,
        )

    except HTTPException:
        raise

    except Exception as exc:
        print("PDF generation failed:", exc)
        raise HTTPException(
            status_code=500,
            detail="PDF generation failed.",
        )