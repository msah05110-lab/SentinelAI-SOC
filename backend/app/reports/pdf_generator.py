from html import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import (
    ParagraphStyle,
    getSampleStyleSheet,
)
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
)


def _safe_text(value, default="N/A"):
    if value is None:
        return default

    return escape(str(value))


def _add_section_title(
    elements,
    title,
    styles,
):
    elements.append(
        Paragraph(
            _safe_text(title),
            styles["SectionTitle"],
        )
    )

    elements.append(
        Spacer(1, 6)
    )


def _add_key_value_table(
    elements,
    rows,
    styles,
):
    table_data = []

    for key, value in rows:
        table_data.append(
            [
                Paragraph(
                    _safe_text(key),
                    styles["TableKey"],
                ),
                Paragraph(
                    _safe_text(value),
                    styles["TableValue"],
                ),
            ]
        )

    table = Table(
        table_data,
        colWidths=[
            45 * mm,
            125 * mm,
        ],
        repeatRows=0,
    )

    table.setStyle(
        TableStyle(
            [
                (
                    "BACKGROUND",
                    (0, 0),
                    (0, -1),
                    colors.HexColor("#E8EEF7"),
                ),
                (
                    "GRID",
                    (0, 0),
                    (-1, -1),
                    0.5,
                    colors.HexColor("#C7D2E0"),
                ),
                (
                    "VALIGN",
                    (0, 0),
                    (-1, -1),
                    "TOP",
                ),
                (
                    "LEFTPADDING",
                    (0, 0),
                    (-1, -1),
                    7,
                ),
                (
                    "RIGHTPADDING",
                    (0, 0),
                    (-1, -1),
                    7,
                ),
                (
                    "TOPPADDING",
                    (0, 0),
                    (-1, -1),
                    6,
                ),
                (
                    "BOTTOMPADDING",
                    (0, 0),
                    (-1, -1),
                    6,
                ),
            ]
        )
    )

    elements.append(table)
    elements.append(Spacer(1, 12))


def _add_list_section(
    elements,
    title,
    values,
    styles,
):
    _add_section_title(
        elements,
        title,
        styles,
    )

    if not values:
        elements.append(
            Paragraph(
                "No data available.",
                styles["Muted"],
            )
        )
        elements.append(
            Spacer(1, 8)
        )
        return

    for value in values:

        text = (
            f"• {_safe_text(value)}"
        )

        elements.append(
            Paragraph(
                text,
                styles["Body"],
            )
        )

        elements.append(
            Spacer(1, 4)
        )

    elements.append(
        Spacer(1, 8)
    )


def _footer(
    canvas,
    document,
):
    canvas.saveState()

    width, height = A4

    canvas.setStrokeColor(
        colors.HexColor("#CBD5E1")
    )

    canvas.line(
        20 * mm,
        15 * mm,
        width - 20 * mm,
        15 * mm,
    )

    canvas.setFont(
        "Helvetica",
        8,
    )

    canvas.setFillColor(
        colors.HexColor("#64748B")
    )

    canvas.drawString(
        20 * mm,
        10 * mm,
        "SentinelAI SOC • Security Incident Report",
    )

    canvas.drawRightString(
        width - 20 * mm,
        10 * mm,
        f"Page {document.page}",
    )

    canvas.restoreState()


def generate_pdf(
    filename: str,
    analysis,
    incident_id=None,
    incident_filename=None,
    created_at=None,
):
    """
    Generate a professional SOC incident PDF report.
    """

    document = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=20 * mm,
        leftMargin=20 * mm,
        topMargin=20 * mm,
        bottomMargin=22 * mm,
        title="SentinelAI SOC Incident Report",
        author="SentinelAI SOC",
    )

    base_styles = getSampleStyleSheet()

    styles = {

        "Title": ParagraphStyle(
            "ReportTitle",
            parent=base_styles["Title"],
            alignment=TA_CENTER,
            fontSize=22,
            leading=28,
            spaceAfter=8,
        ),

        "Subtitle": ParagraphStyle(
            "Subtitle",
            parent=base_styles["Normal"],
            alignment=TA_CENTER,
            fontSize=10,
            textColor=colors.HexColor(
                "#64748B"
            ),
            spaceAfter=20,
        ),

        "SectionTitle": ParagraphStyle(
            "SectionTitle",
            parent=base_styles["Heading2"],
            fontSize=15,
            leading=19,
            textColor=colors.HexColor(
                "#0F172A"
            ),
            spaceBefore=8,
            spaceAfter=8,
        ),

        "Body": ParagraphStyle(
            "Body",
            parent=base_styles["BodyText"],
            fontSize=10,
            leading=15,
            textColor=colors.HexColor(
                "#1E293B"
            ),
            spaceAfter=3,
        ),

        "Muted": ParagraphStyle(
            "Muted",
            parent=base_styles["BodyText"],
            fontSize=9,
            leading=13,
            textColor=colors.HexColor(
                "#64748B"
            ),
        ),

        "TableKey": ParagraphStyle(
            "TableKey",
            parent=base_styles["BodyText"],
            fontSize=9,
            leading=12,
            fontName="Helvetica-Bold",
            textColor=colors.HexColor(
                "#0F172A"
            ),
        ),

        "TableValue": ParagraphStyle(
            "TableValue",
            parent=base_styles["BodyText"],
            fontSize=9,
            leading=12,
            textColor=colors.HexColor(
                "#1E293B"
            ),
        ),
    }

    elements = []

    # ============================================================
    # TITLE
    # ============================================================

    elements.append(
        Spacer(1, 15)
    )

    elements.append(
        Paragraph(
            "SentinelAI SOC",
            styles["Title"],
        )
    )

    elements.append(
        Paragraph(
            "Security Incident Investigation Report",
            styles["Subtitle"],
        )
    )

    # ============================================================
    # OVERVIEW
    # ============================================================

    _add_section_title(
        elements,
        "1. Incident Overview",
        styles,
    )

    _add_key_value_table(
        elements,
        [
            (
                "Incident ID",
                incident_id
                if incident_id is not None
                else "N/A",
            ),
            (
                "Filename",
                incident_filename
                or "N/A",
            ),
            (
                "Severity",
                analysis.severity,
            ),
            (
                "Risk Score",
                f"{analysis.risk_score}/100",
            ),
            (
                "Created At",
                created_at
                or "N/A",
            ),
        ],
        styles,
    )

    # ============================================================
    # AI ANALYSIS
    # ============================================================

    _add_section_title(
        elements,
        "2. AI Security Analysis",
        styles,
    )

    ai_summary = (
        analysis.ai_summary
        or "No AI analysis available."
    )

    for paragraph in str(
        ai_summary
    ).split("\n"):

        paragraph = paragraph.strip()

        if not paragraph:
            elements.append(
                Spacer(1, 4)
            )
            continue

        elements.append(
            Paragraph(
                _safe_text(
                    paragraph
                ),
                styles["Body"],
            )
        )

    elements.append(
        Spacer(1, 10)
    )

    # ============================================================
    # IOC
    # ============================================================

    iocs = (
        analysis.iocs
        if isinstance(
            analysis.iocs,
            dict,
        )
        else {}
    )

    _add_section_title(
        elements,
        "3. Indicators of Compromise",
        styles,
    )

    ioc_rows = [
        (
            "IP Addresses",
            iocs.get("ips", []) or [],
        ),
        (
            "Domains",
            iocs.get("domains", []) or [],
        ),
        (
            "URLs",
            iocs.get("urls", []) or [],
        ),
        (
            "Email Addresses",
            iocs.get("emails", []) or [],
        ),
        (
            "MD5",
            iocs.get("md5", []) or [],
        ),
        (
            "SHA1",
            iocs.get("sha1", []) or [],
        ),
        (
            "SHA256",
            iocs.get("sha256", []) or [],
        ),
    ]

    for label, values in ioc_rows:

        if values:
            display_value = ", ".join(
                str(value)
                for value in values
            )
        else:
            display_value = "None detected"

        _add_key_value_table(
            elements,
            [
                (
                    label,
                    display_value,
                )
            ],
            styles,
        )

    # ============================================================
    # THREAT INTELLIGENCE
    # ============================================================

    _add_section_title(
        elements,
        "4. Threat Intelligence",
        styles,
    )

    threats = (
        analysis.threats
        if isinstance(
            analysis.threats,
            list,
        )
        else []
    )

    if not threats:

        elements.append(
            Paragraph(
                "No threat intelligence findings available.",
                styles["Muted"],
            )
        )

    else:

        for index, threat in enumerate(
            threats,
            start=1,
        ):

            if isinstance(
                threat,
                dict,
            ):

                provider = threat.get(
                    "provider",
                    "Unknown",
                )

                indicator = threat.get(
                    "indicator",
                    "Unknown",
                )

                status = threat.get(
                    "status",
                    "Unknown",
                )

                malicious = threat.get(
                    "malicious",
                    "N/A",
                )

                suspicious = threat.get(
                    "suspicious",
                    "N/A",
                )

                reputation = threat.get(
                    "reputation",
                    "N/A",
                )

                rows = [
                    (
                        f"Finding {index}",
                        "",
                    ),
                    (
                        "Provider",
                        provider,
                    ),
                    (
                        "Indicator",
                        indicator,
                    ),
                    (
                        "Status",
                        status,
                    ),
                    (
                        "Malicious",
                        malicious,
                    ),
                    (
                        "Suspicious",
                        suspicious,
                    ),
                    (
                        "Reputation",
                        reputation,
                    ),
                ]

                _add_key_value_table(
                    elements,
                    rows,
                    styles,
                )

            else:

                elements.append(
                    Paragraph(
                        _safe_text(
                            threat
                        ),
                        styles["Body"],
                    )
                )

    # ============================================================
    # MITRE ATT&CK
    # ============================================================

    _add_section_title(
        elements,
        "5. MITRE ATT&CK Mapping",
        styles,
    )

    mitre = (
        analysis.mitre
        if isinstance(
            analysis.mitre,
            list,
        )
        else []
    )

    if not mitre:

        elements.append(
            Paragraph(
                "No MITRE ATT&CK techniques mapped.",
                styles["Muted"],
            )
        )

    else:

        for technique in mitre:

            if isinstance(
                technique,
                dict,
            ):

                _add_key_value_table(
                    elements,
                    [
                        (
                            "Technique ID",
                            technique.get(
                                "id",
                                "N/A",
                            ),
                        ),
                        (
                            "Technique",
                            technique.get(
                                "name",
                                "N/A",
                            ),
                        ),
                        (
                            "Tactic",
                            technique.get(
                                "tactic",
                                "N/A",
                            ),
                        ),
                    ],
                    styles,
                )

    # ============================================================
    # RECOMMENDATIONS
    # ============================================================

    _add_list_section(
        elements,
        "6. Security Recommendations",
        analysis.recommendations
        or [],
        styles,
    )

    # ============================================================
    # BUILD PDF
    # ============================================================

    document.build(
        elements,
        onFirstPage=_footer,
        onLaterPages=_footer,
    )