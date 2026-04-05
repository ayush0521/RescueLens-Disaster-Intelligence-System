from fastapi import APIRouter, HTTPException
from backend.models import InputText, OutputResponse
from backend.services.processor import process_text
from backend.services.data_loader import load_data
from backend.utils.constants import AREA_COORDS

import random
from datetime import datetime

router = APIRouter()


# -------------------------------
# ANALYZE ENDPOINT (NLP)
# -------------------------------
@router.post("/analyze", response_model=OutputResponse)
def analyze(data: InputText):
    try:
        return process_text(data.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------------
# AREA EXTRACTION (SMART LOCATION)
# -------------------------------
def extract_area(text, city):
    text = str(text).lower()
    areas = AREA_COORDS.get(city, {})

    for area in areas:
        if area in text:
            return areas[area]

    return None


# -------------------------------
# AUTHENTICITY CALCULATION
# -------------------------------
def calculate_authenticity(row, is_recent, has_area):
    score = 0

    # 🕒 Recency
    score += 0.4 if is_recent else 0.1

    # 📰 Source credibility
    source = str(row.get("source", "")).lower()
    if source == "news":
        score += 0.3
    elif source == "twitter":
        score += 0.2
    else:
        score += 0.1

    # 📍 Location confidence
    score += 0.3 if has_area else 0.1

    return round(score, 2)


# -------------------------------
# EXPLANATION GENERATION
# -------------------------------
def generate_explanation(row, is_recent, has_area):
    reasons = []

    # 🕒 Time
    if is_recent:
        reasons.append("recent activity detected")
    else:
        reasons.append("older signal")

    # 📍 Location
    if has_area:
        reasons.append("specific area identified")
    else:
        reasons.append("city-level location")

    # 🧠 Disaster keyword
    disaster = str(row.get("disaster_type", "")).lower()
    if disaster:
        reasons.append(f"{disaster} keywords matched")

    return "Detected due to: " + ", ".join(reasons)


# -------------------------------
# INCIDENTS API (MAIN FRONTEND API)
# -------------------------------
@router.get("/api/incidents")
def get_incidents():
    df = load_data()
    incidents = []

    now = datetime.now()

    for _, row in df.iterrows():

        city = str(row.get("city", "")).strip()

        # 🔍 1. Extract area
        coords = extract_area(row.get("text", ""), city)
        has_area = coords is not None

        city_areas = AREA_COORDS.get(city)

        # 📍 2. SMART LOCATION
        if coords:
            lat = coords[0] + random.uniform(-0.005, 0.005)
            lng = coords[1] + random.uniform(-0.005, 0.005)

        elif city_areas and len(city_areas) > 0:
            base = random.choice(list(city_areas.values()))
            lat = base[0] + random.uniform(-0.015, 0.015)
            lng = base[1] + random.uniform(-0.015, 0.015)

        else:
            lat, lng = 20.0, 78.0

        # 🕒 3. TIME ANALYSIS
        try:
            timestamp = datetime.strptime(
                str(row.get("timestamp", "")),
                "%Y-%m-%d %H:%M:%S"
            )
            time_diff = (now - timestamp).total_seconds()
            is_recent = time_diff < 86400  # 24 hrs
        except Exception:
            is_recent = False

        # 🔥 4. AUTHENTICITY SCORE
        auth_score = calculate_authenticity(row, is_recent, has_area)

        # 🔥 5. EXPLANATION
        explanation = generate_explanation(row, is_recent, has_area)

        # 📦 6. FINAL RESPONSE
        incidents.append({
            "city": city,
            "disaster": row.get("disaster_type", ""),
            "text": row.get("text", ""),
            "timestamp": str(row.get("timestamp", "")),
            "lat": lat,
            "lng": lng,
            "is_recent": is_recent,
            "authenticity": auth_score,
            "explanation": explanation
        })

    return incidents

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
        },
        {
            "id": 2,
            "type": "earthquake",
            "location": "Delhi",
            "severity": "medium"
        }
    ]
