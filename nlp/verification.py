from collections import defaultdict
from typing import Literal

VerificationLabel = Literal["verified", "unverified", "suspicious"]

# Track number of reports
EVENT_COUNT = defaultdict(int)

# Track variation in descriptions
EVENT_TEXTS = defaultdict(set)


def verify_event(disaster: str, city: str, text: str) -> VerificationLabel:
    key = f"{disaster}_{city}"

    # count reports
    EVENT_COUNT[key] += 1

    # store unique text patterns (simple variation check)
    EVENT_TEXTS[key].add(text[:50])

    count = EVENT_COUNT[key]
    variation = len(EVENT_TEXTS[key])

    # logic
    if count >= 2 and variation >= 2:
        return "verified"

    if count >= 3 and variation == 1:
        return "suspicious"  # same repeated content

    return "unverified"