import hashlib
import os
import uuid

from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session

from app.models.uploaded_file import UploadedFile
from app.repositories.upload_repository import UploadRepository


ALLOWED_EXTENSIONS = {
    "csv",
    "json",
    "txt",
    "log"
}


MAX_FILE_SIZE = 50 * 1024 * 1024   # 50 MB


def is_allowed_extension(filename: str) -> bool:
    """
    Check whether the uploaded file extension is allowed.
    """

    extension = filename.split(".")[-1].lower()

    return extension in ALLOWED_EXTENSIONS


def generate_unique_filename(filename: str) -> str:
    """
    Generate a unique filename using UUID.
    """

    return f"{uuid.uuid4()}_{filename}"


def calculate_sha256(file_bytes: bytes) -> str:
    """
    Calculate SHA256 hash of the uploaded file.
    """

    return hashlib.sha256(file_bytes).hexdigest()


def save_file(file_bytes: bytes, filename: str) -> str:
    """
    Save uploaded file into uploads/logs directory.
    """

    upload_directory = os.path.join("uploads", "logs")

    os.makedirs(upload_directory, exist_ok=True)

    file_path = os.path.join(
        upload_directory,
        filename
    )

    with open(file_path, "wb") as file:
        file.write(file_bytes)

    return file_path


async def upload_log_file(
    db: Session,
    upload_file: UploadFile,
    current_user
):
    """
    Complete upload workflow:
    - Read uploaded file
    - Validate extension
    - Validate size
    - Calculate SHA256
    - Check duplicate
    - Save physical file
    - Save metadata into database
    """

    # Read uploaded file
    file_bytes = await upload_file.read()

    # Empty file validation
    if not file_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty."
        )

    # Extension validation
    if not upload_file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Filename is missing."
        )

    if not is_allowed_extension(upload_file.filename):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file type."
        )

    # File size validation
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size exceeds 50 MB."
        )

    # Calculate SHA256
    sha256_hash = calculate_sha256(file_bytes)

    # Repository
    repo = UploadRepository(db)

    # Duplicate file check
    existing_file = repo.get_by_hash(sha256_hash)

    if existing_file:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This file has already been uploaded."
        )

    # Generate unique filename
    stored_filename = generate_unique_filename(
        upload_file.filename
    )

    # Save file to disk
    save_file(
        file_bytes=file_bytes,
        filename=stored_filename
    )

    # Create database object
    uploaded_file = UploadedFile(
        original_filename=upload_file.filename,
        stored_filename=stored_filename,
        file_extension=upload_file.filename.split(".")[-1].lower(),
        file_size=len(file_bytes),
        sha256_hash=sha256_hash,
        uploaded_by=current_user.id,
        status="Uploaded"
    )

    # Save metadata into database
    return repo.create(uploaded_file)