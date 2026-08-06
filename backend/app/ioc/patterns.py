"""
Regular expression patterns for IOC extraction.
"""

# IPv4 Address
IP_PATTERN = (
    r"\b(?:"
    r"(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\."
    r"(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\."
    r"(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\."
    r"(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)"
    r")\b"
)

# Domain Name
DOMAIN_PATTERN = (
    r"\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\b"
)

# URL
URL_PATTERN = (
    r"https?://[^\s\"'<>]+"
)

# Email
EMAIL_PATTERN = (
    r"\b[a-zA-Z0-9._%+-]+@"
    r"[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b"
)

# MD5 Hash
MD5_PATTERN = (
    r"\b[a-fA-F0-9]{32}\b"
)

# SHA1 Hash
SHA1_PATTERN = (
    r"\b[a-fA-F0-9]{40}\b"
)

# SHA256 Hash
SHA256_PATTERN = (
    r"\b[a-fA-F0-9]{64}\b"
)