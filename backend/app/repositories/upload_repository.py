from sqlalchemy.orm import Session

from app.models.uploaded_file import UploadedFile


class UploadRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        upload: UploadedFile
    ):
        self.db.add(upload)
        self.db.commit()
        self.db.refresh(upload)

        return upload

    def get_by_hash(
        self,
        sha256_hash: str
    ):
        return (
            self.db.query(UploadedFile)
            .filter(
                UploadedFile.sha256_hash == sha256_hash
            )
            .first()
        )