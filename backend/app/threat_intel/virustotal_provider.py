from requests.exceptions import RequestException

from app.clients.http_client import HTTPClient
from app.core.config import VIRUSTOTAL_API_KEY
from app.threat_intel.base_provider import BaseThreatProvider


class VirusTotalProvider(BaseThreatProvider):

    BASE_URL = "https://www.virustotal.com/api/v3"

    def lookup(self, indicator: str):

        # Check API Key
        if not VIRUSTOTAL_API_KEY:
            return {
                "provider": "VirusTotal",
                "indicator": indicator,
                "status": "API Key Missing"
            }

        headers = {
            "x-apikey": VIRUSTOTAL_API_KEY
        }

        url = f"{self.BASE_URL}/ip_addresses/{indicator}"

        try:
            data = HTTPClient.get(
                url=url,
                headers=headers
            )

            return {
                "provider": "VirusTotal",
                "indicator": indicator,
                "status": "Success",
                "data": data
            }

        except RequestException as e:
            return {
                "provider": "VirusTotal",
                "indicator": indicator,
                "status": "Lookup Failed",
                "error": str(e)
            }

        except Exception as e:
            return {
                "provider": "VirusTotal",
                "indicator": indicator,
                "status": "Unexpected Error",
                "error": str(e)
            }