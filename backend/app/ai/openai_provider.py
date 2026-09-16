from openai import OpenAI

from app.ai.base_provider import BaseAIProvider

from app.core.config import (
    OPENAI_API_KEY,
    OPENAI_MODEL,
)


class OpenAIProvider(
    BaseAIProvider
):

    def __init__(self):

        if not OPENAI_API_KEY:

            raise RuntimeError(
                "OPENAI_API_KEY is not configured."
            )

        if not OPENAI_MODEL:

            raise RuntimeError(
                "OPENAI_MODEL is not configured."
            )

        self.client = OpenAI(
            api_key=OPENAI_API_KEY
        )


    def generate(
        self,
        prompt: str
    ) -> str:

        if not prompt.strip():

            raise ValueError(
                "AI prompt cannot be empty."
            )


        try:

            response = (
                self.client.responses.create(
                    model=OPENAI_MODEL,
                    input=prompt,
                )
            )

            # Preferred SDK helper
            output_text = getattr(
                response,
                "output_text",
                None
            )

            if output_text:

                result = str(
                    output_text
                ).strip()

                if result:
                    return result


            # Fallback: inspect response.output
            # in case output_text is unavailable.

            output_items = getattr(
                response,
                "output",
                []
            ) or []

            collected_text = []


            for item in output_items:

                content_items = getattr(
                    item,
                    "content",
                    []
                ) or []


                for content in content_items:

                    text = getattr(
                        content,
                        "text",
                        None
                    )

                    if text:

                        collected_text.append(
                            str(text)
                        )


            fallback_result = "\n".join(
                collected_text
            ).strip()


            if fallback_result:

                return fallback_result


            raise RuntimeError(
                "OpenAI returned an empty response."
            )


        except Exception as exc:

            raise RuntimeError(
                f"OpenAI analysis failed: {exc}"
            ) from exc