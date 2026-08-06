from pydantic import BaseModel


class ThreatResult(BaseModel):
    provider: str
    indicator: str
    malicious: bool
    reputation: int | None = None
    source: str | None = None