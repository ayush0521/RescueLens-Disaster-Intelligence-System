from typing import Literal

RecencyLabel = Literal["recent", "old", "unknown"]

RECENT_KEYWORDS = [
    "now", "just", "currently", "today", "right now", "ongoing", "breaking"
]

OLD_KEYWORDS = [
    "yesterday", "last week", "last year", "old", "previous", "earlier"
]


def detect_recency(text: str) -> RecencyLabel:
    text = text.lower()

    recent_score = sum(1 for word in RECENT_KEYWORDS if word in text)
    old_score = sum(1 for word in OLD_KEYWORDS if word in text)

    if recent_score > old_score:
        return "recent"
    if old_score > recent_score:
        return "old"
    return "unknown"