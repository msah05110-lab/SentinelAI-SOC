from app.mitre.techniques import MITRE_TECHNIQUES


class MITREMapper:

    @staticmethod
    def map_text(text: str):

        text = text.lower()

        matches = []

        for keyword, technique in MITRE_TECHNIQUES.items():

            if keyword in text:

                matches.append(technique)

        return matches