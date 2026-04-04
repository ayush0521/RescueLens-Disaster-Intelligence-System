from typing import Literal

ConfidenceLevel = Literal["high", "medium", "low", "none"]

def get_confidence_level(score: int) -> ConfidenceLevel:
    if score >= 3:
        return "high"
    if score == 2:
        return "medium"
    if score == 1:
        return "low"
    return "none"