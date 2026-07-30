from app.database.connection import SessionLocal
from app.seeders.role_seeder import seed_roles

db = SessionLocal()

try:
    seed_roles(db)
    print("✅ Default roles inserted successfully.")
finally:
    db.close()