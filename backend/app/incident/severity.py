def calculate_severity(
    threats: list,
    mitre: list
) -> str:

    if len(threats) >= 5:
        return "Critical"

    if len(threats) >= 3:
        return "High"

    if len(mitre) >= 2:
        return "Medium"

    return "Low"