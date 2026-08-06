import re

from app.ioc.patterns import EMAIL_PATTERN


def extract_emails(text: str) -> list[str]:
    """
    Extract email addresses from text.
    """

    return list(
        set(
            re.findall(
                EMAIL_PATTERN,
                text
            )
        )
    )