DISASTER_KEYWORDS = {
    "flood": ["flood", "flooding", "flash flood", "river overflow", "heavy rain", "water damage"],
    "fire": ["fire", "wildfire", "bushfire", "forest fire", "house fire", "building fire"],
    "earthquake": ["earthquake", "tremor", "seismic activity", "aftershock", "magnitude"],
    "accident": ["accident", "car crash", "traffic collision", "road accident", "vehicle collision"],
}

def detect_disaster(text: str):
    scores = {}

    for disaster, keywords in DISASTER_KEYWORDS.items():
        count = 0

        for word in keywords:
            if word in text.split:
                # optional improvement (negation handling)
                if "no " + word in text:
                    continue
                count += 1

        if count > 0:
            scores[disaster] = count

    if not scores:
        return "unknown", 0

    disaster_type = max(scores, key=scores.get)
    confidence = scores[disaster_type]

    return disaster_type, confidence