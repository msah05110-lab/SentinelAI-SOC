import requests
from requests.exceptions import RequestException


class HTTPClient:

    @staticmethod
    def get(
        url: str,
        headers: dict | None = None,
        params: dict | None = None,
        timeout: int = 20,
    ):

        try:
            response = requests.get(
                url=url,
                headers=headers,
                params=params,
                timeout=timeout,
            )

            response.raise_for_status()

            return response.json()

        except RequestException:
            raise