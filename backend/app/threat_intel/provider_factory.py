from app.threat_intel.virustotal_provider import VirusTotalProvider
from app.threat_intel.abuseipdb_provider import AbuseIPDBProvider
from app.threat_intel.otx_provider import OTXProvider


class ThreatProviderFactory:

    @staticmethod
    def get_provider(provider_name: str):

        provider_name = provider_name.lower()

        providers = {
            "virustotal": VirusTotalProvider(),
            "abuseipdb": AbuseIPDBProvider(),
            "otx": OTXProvider(),
        }

        if provider_name not in providers:
            raise ValueError(f"Unsupported provider: {provider_name}")

        return providers[provider_name]