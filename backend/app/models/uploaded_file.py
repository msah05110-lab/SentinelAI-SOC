from sqlalchemy import (
    String,
    Integer,
    ForeignKey
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.models.base import BaseModel


class UploadedFile(BaseModel):
    __tablename__ = "uploaded_files"

    original_filename: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    stored_filename: Mapped[str] = mapped_column(
        String,
        nullable=False,
        unique=True
    )

    file_extension: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    file_size: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    sha256_hash: Mapped[str] = mapped_column(
        String,
        nullable=False,
        unique=True
    )

    status: Mapped[str] = mapped_column(
        String,
        nullable=False,
        default="Uploaded"
    )

    uploaded_by: Mapped[str] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    user = relationship(
        "User",
        back_populates="uploaded_files"
    )