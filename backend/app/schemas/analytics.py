from datetime import datetime

from pydantic import BaseModel


class AnalyticsResponse(BaseModel):

    total: int

    critical: int

    high: int

    medium: int

    low: int


class TrendItem(BaseModel):

    id: int

    filename: str

    severity: str

    created_at: datetime

    model_config = {
        "from_attributes": True
    }


class TrendResponse(BaseModel):

    incidents: list[TrendItem]


class SeverityDistributionResponse(BaseModel):

    critical: int

    high: int

    medium: int

    low: int