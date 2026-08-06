from pydantic import BaseModel


class IncidentAnalysis(BaseModel):

    iocs: dict

    threats: list

    mitre: list

    severity: str

    ai_summary: str

    recommendations: list[str]