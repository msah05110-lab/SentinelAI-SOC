from pydantic import BaseModel


class ThreatResult(BaseModel):

    provider: str

    indicator: str

    malicious: bool

    suspicious: bool = False

    reputation: int | None = None

    detection_count: int | None = None

    source: str | None = None