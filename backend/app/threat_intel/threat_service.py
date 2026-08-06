from app.threat_intel.provider_factory import ThreatProviderFactory


class ThreatIntelService:

    def lookup(
        self,
        provider: str,
        indicator: str
    ):

        service = ThreatProviderFactory.get_provider(provider)

        return service.lookup(indicator)