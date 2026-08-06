from app.threat_intel.base_provider import BaseThreatProvider


class AbuseIPDBProvider(BaseThreatProvider):

    def lookup(self, indicator: str):

        return {
            "provider": "AbuseIPDB",
            "indicator": indicator,
            "status": "Not Implemented"
        }