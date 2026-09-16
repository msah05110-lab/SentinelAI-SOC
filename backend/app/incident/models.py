from pydantic import BaseModel


class IncidentAnalysis(BaseModel):

    iocs: dict

    threats: list

    mitre: list

    risk_score: int

    severity: str

    ai_summary: str

    recommendations: list[str]