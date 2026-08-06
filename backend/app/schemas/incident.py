from datetime import datetime

from pydantic import BaseModel


class IncidentResponse(BaseModel):

    id: int

    filename: str

    severity: str

    ai_summary: str | None

    created_at: datetime

    class Config:
        from_attributes = True