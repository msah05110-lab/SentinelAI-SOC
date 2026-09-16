import os

from app.reports.pdf_generator import generate_pdf


class ReportService:

    def create_report(
        self,
        analysis,
        filename="incident_report.pdf",
        incident_id=None,
        incident_filename=None,
        created_at=None,
    ):

        reports_dir = os.path.join(
            os.getcwd(),
            "generated_reports",
        )

        os.makedirs(
            reports_dir,
            exist_ok=True,
        )

        filepath = os.path.join(
            reports_dir,
            filename,
        )

        generate_pdf(
            filepath,
            analysis,
            incident_id=incident_id,
            incident_filename=incident_filename,
            created_at=created_at,
        )

        return filepath