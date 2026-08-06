from app.ioc.ioc_service import extract_iocs

sample_log = """
Connection from 192.168.1.10

User visited:
https://evil-domain.com/payload.exe

Email:
admin@test.com

MD5:
d41d8cd98f00b204e9800998ecf8427e

SHA1:
da39a3ee5e6b4b0d3255bfef95601890afd80709

SHA256:
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
"""

result = extract_iocs(sample_log)

print(result)