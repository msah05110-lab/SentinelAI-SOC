from app.reports.pdf_generator import generate_pdf


class ReportService:

    def create_report(
        self,
        analysis,
        filename="incident_report.pdf"
    ):

        generate_pdf(
            filename,
            analysis
        )

        return filename