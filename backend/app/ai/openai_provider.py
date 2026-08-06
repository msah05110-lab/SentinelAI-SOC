from app.ai.base_provider import BaseAIProvider


class OpenAIProvider(BaseAIProvider):

    def generate(self, prompt: str) -> str:

        return "OpenAI integration coming soon."