from app.ai.provider_factory import AIProviderFactory
from app.ai.prompt_builder import build_incident_prompt


class AIService:

    def analyze(
        self,
        provider: str,
        iocs: dict,
        threats: list,
        mitre: list,
        risk_score: int,
        severity: str
    ) -> str:

        prompt = build_incident_prompt(
            iocs=iocs,
            threats=threats,
            mitre=mitre,
            risk_score=risk_score,
            severity=severity
        )

        ai = AIProviderFactory.get_provider(
            provider
        )

        return ai.generate(
            prompt
        )