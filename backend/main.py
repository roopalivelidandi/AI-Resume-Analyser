from fastapi import FastAPI

from backend.routers.upload import router as upload_router

app = FastAPI(
    title="DataPilot AI API",
    version="1.0.0",
    description="Backend API for DataPilot AI"
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