import re

from app.ioc.patterns import (
    MD5_PATTERN,
    SHA1_PATTERN,
    SHA256_PATTERN
)


def extract_hashes(text: str) -> dict:
    """
    Extract MD5, SHA1 and SHA256 hashes.
    """

    return {
        "md5": list(set(re.findall(MD5_PATTERN, text))),
        "sha1": list(set(re.findall(SHA1_PATTERN, text))),
        "sha256": list(set(re.findall(SHA256_PATTERN, text)))
    }