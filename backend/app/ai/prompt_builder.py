def build_incident_prompt(
    iocs: dict,
    threats: list,
    mitre: list
) -> str:

    return f"""
You are an expert SOC Analyst.

Analyze the following incident.

Indicators of Compromise:
{iocs}

Threat Intelligence:
{threats}

MITRE ATT&CK:
{mitre}

Generate:

1. Executive Summary
2. Attack Analysis
3. Severity (Low/Medium/High/Critical)
4. Recommendations
5. Next Investigation Steps
"""