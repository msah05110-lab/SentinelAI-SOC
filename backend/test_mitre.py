from app.mitre.mitre_service import MITREService

service = MITREService()

sample = """
powershell.exe executed

mimikatz dumped credentials

certutil downloaded payload
"""

result = service.analyze(sample)

print(result)