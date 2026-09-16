from app.database.connection import engine
from app.models.base import Base

from app.models.incident import Incident
from app.models.user import User
from app.models.uploaded_file import UploadedFile


print("Creating database tables...")

Base.metadata.create_all(
    bind=engine
)

print("Database tables created successfully.")