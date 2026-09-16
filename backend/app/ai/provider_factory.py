from app.ai.openai_provider import OpenAIProvider
from app.ai.ollama_provider import OllamaProvider


class AIProviderFactory:

    @staticmethod
    def get_provider(
        name: str
    ):

        provider_name = (
            name.strip().lower()
        )

        if provider_name == "openai":
            return OpenAIProvider()

        if provider_name == "ollama":
            return OllamaProvider()

        raise ValueError(
            f"Unsupported AI provider: {name}"
        )