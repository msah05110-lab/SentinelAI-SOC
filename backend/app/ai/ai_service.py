from app.ai.provider_factory import AIProviderFactory
from app.ai.prompt_builder import build_incident_prompt


class AIService:

    def analyze(
        self,
        provider: str,
        iocs: dict,
        threats: list,
        mitre: list
    ):

        prompt = build_incident_prompt(
            iocs,
            threats,
            mitre
        )

        ai = AIProviderFactory.get_provider(provider)

        return ai.generate(prompt)