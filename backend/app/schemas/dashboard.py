from pydantic import BaseModel

from app.schemas.incident import IncidentResponse


class DashboardResponse(BaseModel):

    total_incidents: int

    critical: int

    high: int

    medium: int

    low: int

    average_risk_score: float

    highest_risk_score: int

    recent: list[IncidentResponse]