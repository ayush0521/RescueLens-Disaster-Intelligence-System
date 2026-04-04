CITIES = ["mumbai", "delhi", "pune", "chennai"]

def detect_city(text: str):
    for city in CITIES:
        if city in text:
            return city
    return "unknown"