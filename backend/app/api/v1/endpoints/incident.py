from fastapi import APIRouter, UploadFile, File

from app.incident.incident_service import IncidentService
from app.incident.models import IncidentAnalysis
from app.reports.report_service import ReportService

router = APIRouter(
    prefix="/incidents",
    tags=["Incident Analysis"]
)

incident_service = IncidentService()
report_service = ReportService()


@router.post("/analyze")
async def analyze_incident(
    file: UploadFile = File(...)
):
    """
    Analyze uploaded log file.
    """

    content = await file.read()

    text = content.decode(
        "utf-8",
        errors="ignore"
    )

    result = incident_service.analyze(text)

    return result


@router.post("/report")
async def generate_report():
    """
    Generate sample PDF report.
    """

    analysis = IncidentAnalysis(
        iocs={},
        threats=[],
        mitre=[],
        severity="High",
        ai_summary="Sample AI Summary",
        recommendations=[
            "Isolate affected host",
            "Reset compromised credentials",
            "Review firewall logs",
            "Run antivirus scan"
        ]
    )

    filename = report_service.create_report(
        analysis
    )

    return {
        "status": "success",
        "message": "PDF generated successfully.",
        "file": filename
    }