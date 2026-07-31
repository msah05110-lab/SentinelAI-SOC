from datetime import datetime

from pydantic import BaseModel, ConfigDict


class UploadResponse(BaseModel):
    id: str
    original_filename: str
    stored_filename: str
    file_extension: str
    file_size: int
    sha256_hash: str
    status: str
    uploaded_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )