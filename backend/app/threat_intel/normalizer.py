from app.schemas.threat import ThreatResult


def normalize_virustotal(
    indicator: str,
    response: dict
) -> ThreatResult:

    data = response.get(
        "data",
        {}
    )

    attributes = data.get(
        "attributes",
        {}
    )

    stats = attributes.get(
        "last_analysis_stats",
        {}
    )

    if not isinstance(stats, dict):
        stats = {}

    malicious = int(
        stats.get(
            "malicious",
            0
        ) or 0
    )

    suspicious = int(
        stats.get(
            "suspicious",
            0
        ) or 0
    )

    detection_count = (
        malicious +
        suspicious
    )

    return ThreatResult(

        provider="VirusTotal",

        indicator=indicator,

        malicious=malicious > 0,

        suspicious=suspicious > 0,

        reputation=malicious,

        detection_count=detection_count,

        source="VirusTotal"
    )