def _count_threat_signals(
    threats: list
):
    malicious_count = 0
    suspicious_count = 0

    for threat in threats:

        if not isinstance(
            threat,
            dict
        ):
            continue


        if threat.get(
            "status"
        ) != "Success":
            continue


        if threat.get(
            "malicious"
        ):
            malicious_count += 1


        if threat.get(
            "suspicious"
        ):
            suspicious_count += 1


    return (
        malicious_count,
        suspicious_count
    )


def calculate_risk_score(
    iocs: dict,
    threats: list,
    mitre: list
) -> int:

    score = 0


    # ============================================================
    # THREAT INTELLIGENCE
    # ============================================================

    malicious_count, suspicious_count = (
        _count_threat_signals(
            threats
        )
    )

    score += (
        malicious_count * 20
    )

    score += (
        suspicious_count * 10
    )


    # ============================================================
    # MITRE
    # ============================================================

    score += (
        len(mitre) * 10
    )


    # ============================================================
    # IOC TYPES
    # ============================================================

    if not isinstance(
        iocs,
        dict
    ):
        iocs = {}


    score += (
        len(
            iocs.get(
                "ips",
                []
            ) or []
        ) * 5
    )


    score += (
        len(
            iocs.get(
                "domains",
                []
            ) or []
        ) * 4
    )


    score += (
        len(
            iocs.get(
                "urls",
                []
            ) or []
        ) * 3
    )


    score += (
        len(
            iocs.get(
                "emails",
                []
            ) or []
        ) * 2
    )


    score += (
        len(
            iocs.get(
                "md5",
                []
            ) or []
        ) * 4
    )


    score += (
        len(
            iocs.get(
                "sha1",
                []
            ) or []
        ) * 4
    )


    score += (
        len(
            iocs.get(
                "sha256",
                []
            ) or []
        ) * 6
    )


    return min(
        max(
            score,
            0
        ),
        100
    )


def severity_from_risk_score(
    risk_score: int
) -> str:

    if risk_score >= 80:
        return "Critical"

    if risk_score >= 60:
        return "High"

    if risk_score >= 30:
        return "Medium"

    return "Low"