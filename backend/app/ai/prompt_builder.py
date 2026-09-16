def build_incident_prompt(
    iocs: dict,
    threats: list,
    mitre: list,
    risk_score: int,
    severity: str
) -> str:

    return f"""
You are a senior Security Operations Center (SOC) analyst.

Analyze the security incident using ONLY the evidence
provided below.

Do not invent facts.
Do not assume details that are not present.
Clearly distinguish evidence from reasonable inference.

============================================================
INCIDENT RISK
============================================================

Risk Score:
{risk_score}/100

Calculated Severity:
{severity}

============================================================
INDICATORS OF COMPROMISE
============================================================

{iocs}

============================================================
THREAT INTELLIGENCE
============================================================

{threats}

============================================================
MITRE ATT&CK MAPPING
============================================================

{mitre}

============================================================
REQUIRED ANALYSIS
============================================================

Produce a concise professional SOC incident analysis
using exactly these sections:

1. Executive Summary
2. Attack Analysis
3. Severity Assessment
4. Key Findings
5. Recommended Actions
6. Next Investigation Steps

============================================================
ANALYSIS RULES
============================================================

- Base every statement on the supplied evidence.
- Do not fabricate an attacker identity.
- Do not fabricate malware names.
- Do not fabricate timestamps, hosts, users, or locations.
- Mention malicious or suspicious indicators only when
  supported by the threat intelligence evidence.
- Explain why the calculated severity is appropriate.
- Explain the security significance of the MITRE techniques.
- Recommend practical incident-response actions.
- Keep the response suitable for storage in a SOC incident record.
- Do not return JSON.
- Return clear readable text with section headings.
"""