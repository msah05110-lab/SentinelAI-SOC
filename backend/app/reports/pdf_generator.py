from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

styles = getSampleStyleSheet()


def generate_pdf(filename: str, analysis):

    document = SimpleDocTemplate(filename)

    elements = []

    elements.append(
        Paragraph(
            "SentinelAI SOC Incident Report",
            styles["Heading1"]
        )
    )

    elements.append(
        Paragraph(
            f"Severity: {analysis.severity}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"AI Summary: {analysis.ai_summary}",
            styles["Normal"]
        )
    )

    document.build(elements)