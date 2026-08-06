import re

from app.ioc.patterns import DOMAIN_PATTERN


def extract_domains(text: str) -> list[str]:
    """
    Extract domain names from text.
    """

    return list(
        set(
            re.findall(
                DOMAIN_PATTERN,
                text
            )
        )
    )