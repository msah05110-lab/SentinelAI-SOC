from app.ioc.ip_extractor import extract_ips
from app.ioc.domain_extractor import extract_domains
from app.ioc.url_extractor import extract_urls
from app.ioc.email_extractor import extract_emails
from app.ioc.hash_extractor import extract_hashes


def extract_iocs(text: str) -> dict:
    """
    Extract all Indicators of Compromise (IOCs)
    from the given text.
    """

    hashes = extract_hashes(text)

    return {
        "ips": extract_ips(text),
        "domains": extract_domains(text),
        "urls": extract_urls(text),
        "emails": extract_emails(text),
        "md5": hashes["md5"],
        "sha1": hashes["sha1"],
        "sha256": hashes["sha256"]
    }