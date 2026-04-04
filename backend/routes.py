from fastapi import APIRouter, HTTPException
from backend.models import InputText, OutputResponse
from backend.services.processor import process_text

router = APIRouter()


@router.post("/analyze", response_model=OutputResponse)
def analyze(data: InputText):
    try:
        return process_text(data.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))