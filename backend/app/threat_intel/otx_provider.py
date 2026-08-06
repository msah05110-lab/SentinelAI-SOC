from app.threat_intel.base_provider import BaseThreatProvider


class OTXProvider(BaseThreatProvider):

    def lookup(self, indicator: str):

        return {
            "provider": "AlienVault OTX",
            "indicator": indicator,
            "status": "Not Implemented"
        }