from app.ai.base_provider import BaseAIProvider


class OllamaProvider(BaseAIProvider):

    def generate(self, prompt: str) -> str:

        return "Ollama integration coming soon."