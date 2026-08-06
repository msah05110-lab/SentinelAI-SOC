from app.ioc.ioc_service import extract_iocs
from app.mitre.mitre_service import MITREService
from app.incident.models import IncidentAnalysis
from app.incident.severity import calculate_severity
from app.incident.recommendations import generate_recommendations


class IncidentService:

    def analyze(self, text: str):

        # IOC Extraction
        iocs = extract_iocs(text)

        # MITRE Mapping
        mitre = MITREService().analyze(text)

        # Threat Intelligence
        threats = []

        # Severity Calculation
        severity = calculate_severity(
            threats,
            mitre
        )

        # Final Response
        return IncidentAnalysis(
            iocs=iocs,
            threats=threats,
            mitre=mitre,
            severity=severity,
            ai_summary="AI analysis will be added in next phase.",
            recommendations=generate_recommendations()
        )