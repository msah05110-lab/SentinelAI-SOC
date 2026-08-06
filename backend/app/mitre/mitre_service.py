from app.mitre.mapper import MITREMapper


class MITREService:

    def analyze(self, text: str):

        return MITREMapper.map_text(text)