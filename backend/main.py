from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers.upload import router as upload_router

app = FastAPI(
    title="DataPilot AI API",
    version="1.0.0",
    description="Backend API for DataPilot AI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to DataPilot AI Backend 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

print("✅ Upload router imported successfully")
app.include_router(upload_router)