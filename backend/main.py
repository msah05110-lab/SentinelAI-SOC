from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import APP_NAME, APP_VERSION, API_V1_STR

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    description="AI Powered Security Operations Center"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(
    api_router,
    prefix=API_V1_STR
)


@app.get("/")
def root():
    return {
        "message": "Welcome to SentinelAI SOC 🚀"
    }