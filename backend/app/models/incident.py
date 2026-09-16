from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.models.base import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=True,
        index=True
    )

    filename = Column(String, nullable=False)
    severity = Column(String, nullable=False)
    ai_summary = Column(Text, nullable=True)
    risk_score = Column(Integer, nullable=False, default=0)
    iocs = Column(JSON, nullable=True)
    threats = Column(JSON, nullable=True)
    mitre = Column(JSON, nullable=True)
    recommendations = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="incidents")