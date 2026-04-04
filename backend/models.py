from pydantic import BaseModel, Field
from typing import List


class InputText(BaseModel):
    text: str = Field(..., example="Heavy rain causing flooding in Mumbai")


class Alert(BaseModel):
    to: str
    message: str


class OutputResponse(BaseModel):
    text: str
    disaster: str
    city: str
    confidence: str
    recency: str
    verification: str
    authenticity: str
    alerts_sent: List[Alert]