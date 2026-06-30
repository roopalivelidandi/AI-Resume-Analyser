from fastapi import APIRouter, UploadFile, File
from services.upload_service import UploadService
from services.analysis_service import AnalysisService

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/")
async def upload_dataset(file: UploadFile = File(...)):

    upload_service = UploadService()

    dataframe = upload_service.load_dataset(file)

    analysis_service = AnalysisService()

    (
        profile,
        chart,
        logs,
        insights,
        cleaning_suggestions,
        model_recommendation,
        report
    ) = analysis_service.analyze(dataframe)

    return {
        "profile": profile,
        "logs": logs,
        "insights": insights,
        "cleaning_suggestions": cleaning_suggestions,
        "model_recommendation": model_recommendation,
        "report": report
    }