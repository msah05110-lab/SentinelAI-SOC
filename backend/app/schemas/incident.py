from datetime import datetime

from pydantic import BaseModel


class IncidentResponse(BaseModel):

    id: int

    filename: str

    severity: str

    risk_score: int

    ai_summary: str | None

    created_at: datetime

    class Config:
        from_attributes = True