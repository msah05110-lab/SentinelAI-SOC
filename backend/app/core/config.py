from dotenv import load_dotenv
import os


load_dotenv()


# ============================================================
# APPLICATION
# ============================================================

APP_NAME = os.getenv(
    "APP_NAME",
    "SentinelAI SOC"
)

APP_VERSION = os.getenv(
    "APP_VERSION",
    "1.0.0"
)

DEBUG = os.getenv(
    "DEBUG",
    "False"
)

API_V1_STR = os.getenv(
    "API_V1_STR",
    "/api/v1"
)


# ============================================================
# DATABASE
# ============================================================

DATABASE_URL = os.getenv(
    "DATABASE_URL"
)


# ============================================================
# AUTHENTICATION
# ============================================================

SECRET_KEY = os.getenv(
    "SECRET_KEY"
)

ALGORITHM = os.getenv(
    "ALGORITHM",
    "HS256"
)

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv(
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        "60"
    )
)


# ============================================================
# OPENAI
# ============================================================

OPENAI_API_KEY = os.getenv(
    "OPENAI_API_KEY"
)

OPENAI_MODEL = os.getenv(
    "OPENAI_MODEL",
    "gpt-5-mini"
)


# ============================================================
# THREAT INTELLIGENCE
# ============================================================

VIRUSTOTAL_API_KEY = os.getenv(
    "VIRUSTOTAL_API_KEY"
)

ABUSEIPDB_API_KEY = os.getenv(
    "ABUSEIPDB_API_KEY"
)

OTX_API_KEY = os.getenv(
    "OTX_API_KEY"
)