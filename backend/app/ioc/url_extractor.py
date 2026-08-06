import re

from app.ioc.patterns import URL_PATTERN


def extract_urls(text: str) -> list[str]:
    """
    Extract URLs from text.
    """

    return list(
        set(
            re.findall(
                URL_PATTERN,
                text
            )
        )
    )