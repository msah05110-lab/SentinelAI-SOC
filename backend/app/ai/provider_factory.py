from app.ai.openai_provider import OpenAIProvider
from app.ai.ollama_provider import OllamaProvider


class AIProviderFactory:

    @staticmethod
    def get_provider(name: str):

        providers = {
            "openai": OpenAIProvider(),
            "ollama": OllamaProvider(),
        }

        return providers[name.lower()]