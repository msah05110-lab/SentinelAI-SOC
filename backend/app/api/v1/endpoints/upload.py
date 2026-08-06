from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.upload import UploadResponse
from app.services.upload_service import upload_log_file

router = APIRouter(
    prefix="/upload",
    tags=["Log Upload"]
)


@router.post(
    "/log",
    response_model=UploadResponse
)
async def upload_log(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return await upload_log_file(
        db=db,
        upload_file=file,
        current_user=current_user
    )