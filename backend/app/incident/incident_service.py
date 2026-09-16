from sqlalchemy.orm import Session

from app.ioc.ioc_service import extract_iocs
from app.mitre.mitre_service import MITREService

from app.incident.models import IncidentAnalysis

from app.incident.severity import (
    calculate_risk_score,
    severity_from_risk_score,
)

from app.incident.recommendations import generate_recommendations

from app.models.incident import Incident
from app.models.user import User

from app.threat_intel.threat_service import ThreatIntelService
from app.ai.ai_service import AIService


class IncidentService:

    def analyze(
        self,
        text: str,
        db: Session,
        filename: str,
        current_user: User,
    ):

        # 1. IOC EXTRACTION
        iocs = extract_iocs(text)

        # 2. MITRE ATT&CK
        mitre = MITREService().analyze(text)

        # 3. THREAT INTELLIGENCE
        threats = []
        threat_service = ThreatIntelService()

        for indicator in (iocs.get("ips", []) or []):
            try:
                result = threat_service.lookup(
                    provider="virustotal",
                    indicator=indicator,
                )
                threats.append(result)

            except Exception as e:
                threats.append({
                    "provider": "VirusTotal",
                    "indicator": indicator,
                    "status": "Lookup Failed",
                    "error": str(e),
                })

        # 4. RISK SCORE
        risk_score = calculate_risk_score(
            iocs=iocs,
            threats=threats,
            mitre=mitre,
        )

        # 5. SEVERITY
        severity = severity_from_risk_score(risk_score)

        # 6. AI ANALYSIS
        try:
            ai_summary = AIService().analyze(
                provider="openai",
                iocs=iocs,
                threats=threats,
                mitre=mitre,
                risk_score=risk_score,
                severity=severity,
            )

        except Exception as e:
            print("AI analysis failed:", e)

            ai_summary = (
                "AI analysis was unavailable. "
                "The incident was still analyzed "
                "using IOC extraction, MITRE ATT&CK, "
                "threat intelligence, and risk scoring."
            )

        # 7. RECOMMENDATIONS
        recommendations = generate_recommendations()

        # 8. SAVE INCIDENT WITH THE LOGGED-IN USER
        incident = Incident(
            user_id=current_user.id,
            filename=filename,
            severity=severity,
            risk_score=risk_score,
            ai_summary=ai_summary,
            iocs=iocs,
            threats=threats,
            mitre=mitre,
            recommendations=recommendations,
        )

        try:
            db.add(incident)
            db.commit()
            db.refresh(incident)

        except Exception:
            db.rollback()
            raise

        # 9. RETURN COMPLETE ANALYSIS
        return IncidentAnalysis(
            iocs=iocs,
            threats=threats,
            mitre=mitre,
            risk_score=risk_score,
            severity=severity,
            ai_summary=ai_summary,
            recommendations=recommendations,
        )