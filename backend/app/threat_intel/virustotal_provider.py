from requests.exceptions import RequestException

from app.clients.http_client import HTTPClient

from app.core.config import (
    VIRUSTOTAL_API_KEY
)

from app.threat_intel.base_provider import (
    BaseThreatProvider
)

from app.threat_intel.normalizer import (
    normalize_virustotal
)


class VirusTotalProvider(
    BaseThreatProvider
):

    BASE_URL = (
        "https://www.virustotal.com/api/v3"
    )


    def lookup(
        self,
        indicator: str
    ):

        # ========================================================
        # API KEY
        # ========================================================

        if not VIRUSTOTAL_API_KEY:

            return {
                "provider": "VirusTotal",
                "indicator": indicator,
                "status": "API Key Missing"
            }


        # ========================================================
        # REQUEST
        # ========================================================

        headers = {
            "x-apikey":
                VIRUSTOTAL_API_KEY
        }


        url = (
            f"{self.BASE_URL}"
            f"/ip_addresses/{indicator}"
        )


        try:

            data = HTTPClient.get(
                url=url,
                headers=headers
            )


            # ====================================================
            # NORMALIZE
            # ====================================================

            result = normalize_virustotal(
                indicator=indicator,
                response=data
            )


            # Convert Pydantic model
            # into JSON-compatible dict.

            return {
                "status": "Success",
                **result.model_dump()
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