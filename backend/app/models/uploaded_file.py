import uuid

from sqlalchemy import (
    Column,
    String,
    Integer,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class UploadedFile(Base):
    __tablename__ = "uploaded_files"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    original_filename = Column(
        String,
        nullable=False
    )

    stored_filename = Column(
        String,
        nullable=False,
        unique=True
    )

    file_extension = Column(
        String,
        nullable=False
    )

    file_size = Column(
        Integer,
        nullable=False
    )

    sha256_hash = Column(
        String,
        nullable=False,
        unique=True
    )

    status = Column(
        String,
        nullable=False,
        default="Uploaded"
    )

    uploaded_by = Column(
        String,
        ForeignKey("users.id"),
        nullable=False
    )

    uploaded_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="uploaded_files"
    )