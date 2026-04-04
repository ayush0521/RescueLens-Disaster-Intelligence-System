def get_confidence_level(score: int) -> str:
    if score >= 3:
        return "high"
    elif score == 2:
        return "medium"
    elif score == 1:
        return "low"
    return "none"