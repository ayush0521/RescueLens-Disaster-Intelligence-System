from nlp.cleaner import clean_text
from nlp.classifier import detect_disaster
from nlp.location import detect_city
from nlp.scorer import get_confidence_level
from nlp.recency import detect_recency
from nlp.verification import verify_event

from backend.utils.users import USERS


def get_authenticity(confidence, recency, verification):
    score = 0

    if confidence == "high":
        score += 2
    elif confidence == "medium":
        score += 1

    if recency == "recent":
        score += 1

    if verification == "verified":
        score += 2

    if score >= 4:
        return "high"
    elif score >= 2:
        return "medium"
    return "low"


def get_target_users(city: str):
    return [user for user in USERS if user["city"] == city]


def send_alert(disaster, city, authenticity):
    users = get_target_users(city)

    alerts = []
    if authenticity in ["high", "medium"]:
        for user in users:
            alerts.append({
                "to": user["phone"],
                "message": f"🚨 {disaster.upper()} alert in {city}. Stay safe!"
            })

    return alerts


def process_text(text: str):
    if not text or not text.strip():
        return {
            "text": text,
            "disaster": "unknown",
            "city": "unknown",
            "confidence": "none",
            "recency": "unknown",
            "verification": "unverified",
            "authenticity": "low",
            "alerts_sent": []
        }

    cleaned = clean_text(text)

    disaster, score = detect_disaster(cleaned)
    city = detect_city(cleaned)
    confidence = get_confidence_level(score)

    recency = detect_recency(cleaned)
    verification = verify_event(disaster, city, cleaned)

    authenticity = get_authenticity(confidence, recency, verification)

    alerts = send_alert(disaster, city, authenticity)

    return {
        "text": text,
        "disaster": disaster,
        "city": city,
        "confidence": confidence,
        "recency": recency,
        "verification": verification,
        "authenticity": authenticity,
        "alerts_sent": alerts
    }