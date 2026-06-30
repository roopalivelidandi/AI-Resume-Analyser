from fastapi import FastAPI

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