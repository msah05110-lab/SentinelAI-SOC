from app.reports.report_service import ReportService
from app.incident.models import IncidentAnalysis

analysis = IncidentAnalysis(
    iocs={},
    threats=[],
    mitre=[],
    severity="High",
    ai_summary="This is a sample AI summary.",
    recommendations=[
        "Isolate Host"
    ]
)

service = ReportService()

pdf = service.create_report(analysis)

print(pdf)