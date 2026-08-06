import re

from app.ioc.patterns import IP_PATTERN


def extract_ips(text: str) -> list[str]:
    """
    Extract IPv4 addresses from text.
    """

    return list(
        set(
            re.findall(
                IP_PATTERN,
                text
            )
        )
    )