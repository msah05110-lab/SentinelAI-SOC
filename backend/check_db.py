from sqlalchemy import create_engine, text
from app.core.config import DATABASE_URL

print("=" * 60)
print("DATABASE_URL:")
print(DATABASE_URL)
print("=" * 60)

engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    db = conn.execute(text("SELECT current_database()")).scalar()
    print(f"\nConnected Database: {db}")

    print("\nTables:")

    tables = conn.execute(text("""
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
        ORDER BY table_name
    """)).fetchall()

    if not tables:
        print("❌ No tables found.")
    else:
        for table in tables:
            print("-", table[0])

    print("\nAlembic Version:")

    try:
        version = conn.execute(
            text("SELECT version_num FROM alembic_version")
        ).fetchall()

        print(version)
    except Exception as e:
        print("Alembic Error:", e)