from fastapi import APIRouter

router = APIRouter()

@router.get("/alerts")
def get_alerts():
    return [
        {
            "id": 1,
            "type": "flood",
            "location": "Mumbai",
            "severity": "high"
        }
    ]
