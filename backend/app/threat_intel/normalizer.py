from app.schemas.threat import ThreatResult


def normalize_virustotal(
    indicator: str,
    response: dict
) -> ThreatResult:

    stats = (
        response
        .get("data", {})
        .get("attributes", {})
        .get("last_analysis_stats", {})
    )

    malicious = stats.get("malicious", 0)

    return ThreatResult(
        provider="VirusTotal",
        indicator=indicator,
        malicious=malicious > 0,
        reputation=malicious,
        source="VirusTotal"
    )