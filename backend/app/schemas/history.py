from datetime import datetime

from pydantic import BaseModel


class HistoryResponse(BaseModel):
    id: int
    filename: str
    severity: str
    ai_summary: str | None
    created_at: datetime

    model_config = {
        "from_attributes": True
    }


class HistoryListResponse(BaseModel):
    incidents: list[HistoryResponse]