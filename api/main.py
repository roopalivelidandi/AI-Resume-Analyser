from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import io

from services.analysis_service import AnalysisService

app = FastAPI(
    title="DataPilot AI API",
    version="1.0.0"
)

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "🚀 DataPilot AI API Running"
    }


@app.get("/status")
def status():
    return {
        "status": "running"
    }


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    contents = await file.read()

    df = pd.read_csv(io.BytesIO(contents))

    analysis_service = AnalysisService()

    (
        profile,
        chart,
        logs,
        insights,
        cleaning_suggestions,
        model_recommendation,
        report
    ) = analysis_service.analyze(df)

    return {
        "profile": profile,
        "logs": logs,
        "insights": insights,
        "cleaning": cleaning_suggestions,
        "model": model_recommendation,
        "report": report
    }