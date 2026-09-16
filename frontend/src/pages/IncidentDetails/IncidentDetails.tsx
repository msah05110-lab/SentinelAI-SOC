import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Paper,
    Typography,
} from "@mui/material";

import {
    ArrowBack,
    Delete,
    PictureAsPdf,
    Security,
    Speed,
} from "@mui/icons-material";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    deleteIncident,
    generateIncidentReport,
    getIncident,
} from "../../services/incidentService";

import type { Incident } from "../../types/incident";


function IncidentDetails() {

    const { id } = useParams();
    const navigate = useNavigate();


    // ============================================================
    // STATE
    // ============================================================

    const [incident, setIncident] =
        useState<Incident | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [deleting, setDeleting] =
        useState(false);

    const [generatingReport, setGeneratingReport] =
        useState(false);


    // ============================================================
    // HELPERS
    // ============================================================

    function getSeverityColor(
        severity: string
    ):
        | "success"
        | "info"
        | "warning"
        | "error" {

        switch (severity) {

            case "Critical":
                return "error";

            case "High":
                return "warning";

            case "Medium":
                return "info";

            case "Low":
            default:
                return "success";
        }
    }


    function getRiskColor(
        score: number
    ):
        | "success"
        | "info"
        | "warning"
        | "error" {

        if (score >= 80) {
            return "error";
        }

        if (score >= 60) {
            return "warning";
        }

        if (score >= 30) {
            return "info";
        }

        return "success";
    }


    function getRiskLabel(
        score: number
    ): string {

        if (score >= 80) {
            return "Critical Risk";
        }

        if (score >= 60) {
            return "High Risk";
        }

        if (score >= 30) {
            return "Medium Risk";
        }

        return "Low Risk";
    }


    function getRiskBarColor(
        score: number
    ): string {

        if (score >= 80) {
            return "error.main";
        }

        if (score >= 60) {
            return "warning.main";
        }

        if (score >= 30) {
            return "info.main";
        }

        return "success.main";
    }


    function safeString(
        value: unknown,
        fallback = "N/A"
    ): string {

        if (
            value === null ||
            value === undefined
        ) {
            return fallback;
        }

        return String(value);
    }


    function formatDate(
        value: unknown
    ): string {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "Unknown";
        }

        const date = new Date(
            String(value)
        );

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "Unknown";
        }

        return date.toLocaleString();
    }


    // ============================================================
    // LOAD INCIDENT
    // ============================================================

    useEffect(() => {

        let mounted = true;

        async function loadIncident() {

            if (!id) {

                if (mounted) {

                    setError(
                        "Incident ID is missing."
                    );

                    setLoading(false);
                }

                return;
            }

            const incidentId =
                Number(id);

            if (
                Number.isNaN(
                    incidentId
                )
            ) {

                if (mounted) {

                    setError(
                        "Invalid incident ID."
                    );

                    setLoading(false);
                }

                return;
            }

            try {

                setLoading(true);
                setError("");

                const data =
                    await getIncident(
                        incidentId
                    );

                if (mounted) {

                    setIncident(
                        data
                    );
                }

            } catch (err) {

                console.error(
                    "Failed to load incident:",
                    err
                );

                if (mounted) {

                    setError(
                        err instanceof Error
                            ? err.message
                            : "Failed to load incident."
                    );
                }

            } finally {

                if (mounted) {

                    setLoading(false);
                }
            }
        }

        loadIncident();

        return () => {

            mounted = false;
        };

    }, [id]);


    // ============================================================
    // DELETE INCIDENT
    // ============================================================

    async function handleDelete() {

        if (
            !id ||
            deleting
        ) {
            return;
        }

        const incidentId =
            Number(id);

        if (
            Number.isNaN(
                incidentId
            )
        ) {

            setError(
                "Invalid incident ID."
            );

            return;
        }

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this incident?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setDeleting(true);
            setError("");

            await deleteIncident(
                incidentId
            );

            navigate(
                "/incidents",
                {
                    replace: true,
                }
            );

        } catch (err) {

            console.error(
                "Failed to delete incident:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to delete incident."
            );

        } finally {

            setDeleting(false);
        }
    }


    // ============================================================
    // GENERATE PDF
    // ============================================================

    async function handleGenerateReport() {

        if (
            !id ||
            generatingReport
        ) {
            return;
        }

        const incidentId =
            Number(id);

        if (
            Number.isNaN(
                incidentId
            )
        ) {

            setError(
                "Invalid incident ID."
            );

            return;
        }

        try {

            setGeneratingReport(true);
            setError("");

            await generateIncidentReport(
                incidentId
            );

        } catch (err) {

            console.error(
                "Failed to generate report:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to generate PDF report."
            );

        } finally {

            setGeneratingReport(false);
        }
    }


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <Box
                sx={{
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 2,
                }}
            >

                <CircularProgress />

                <Typography
                    color="text.secondary"
                >
                    Loading incident...
                </Typography>

            </Box>
        );
    }


    // ============================================================
    // ERROR
    // ============================================================

    if (
        error &&
        !incident
    ) {

        return (

            <Box sx={{ p: 4 }}>

                <Alert severity="error">
                    {error}
                </Alert>

                <Button
                    startIcon={
                        <ArrowBack />
                    }
                    sx={{
                        mt: 2,
                    }}
                    onClick={() =>
                        navigate(
                            "/incidents"
                        )
                    }
                >
                    Back to Incidents
                </Button>

            </Box>
        );
    }


    // ============================================================
    // NOT FOUND
    // ============================================================

    if (!incident) {

        return (

            <Box sx={{ p: 4 }}>

                <Alert severity="warning">
                    Incident not found.
                </Alert>

                <Button
                    startIcon={
                        <ArrowBack />
                    }
                    sx={{
                        mt: 2,
                    }}
                    onClick={() =>
                        navigate(
                            "/incidents"
                        )
                    }
                >
                    Back to Incidents
                </Button>

            </Box>
        );
    }


    // ============================================================
    // NORMALIZED DATA
    // ============================================================

    const iocs =
        incident.iocs ?? {
            ips: [],
            domains: [],
            urls: [],
            emails: [],
            md5: [],
            sha1: [],
            sha256: [],
        };

    const threats =
        Array.isArray(
            incident.threats
        )
            ? incident.threats
            : [];

    const mitre =
        Array.isArray(
            incident.mitre
        )
            ? incident.mitre
            : [];

    const recommendations =
        Array.isArray(
            incident.recommendations
        )
            ? incident.recommendations
            : [];


    // ============================================================
    // RISK SCORE
    // ============================================================

    const parsedRiskScore =
        Number(
            incident.risk_score ?? 0
        );

    const riskScore =
        Number.isFinite(
            parsedRiskScore
        )
            ? Math.min(
                100,
                Math.max(
                    0,
                    parsedRiskScore
                )
            )
            : 0;


    // ============================================================
    // MITRE GROUPING
    // ============================================================

    const mitreByTactic:
        Record<string, typeof mitre> = {};

    for (
        const technique of mitre
    ) {

        const tactic =
            safeString(
                technique?.tactic,
                "Unknown Tactic"
            );

        if (
            !mitreByTactic[
                tactic
            ]
        ) {
            mitreByTactic[
                tactic
            ] = [];
        }

        mitreByTactic[
            tactic
        ].push(
            technique
        );
    }


    const tacticCount =
        Object.keys(
            mitreByTactic
        ).length;


    // ============================================================
    // PAGE
    // ============================================================

    return (

        <Box
            sx={{
                p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },

                width: "100%",

                boxSizing: "border-box",
            }}
        >

            {/* ====================================================
                TOP ACTIONS
            ==================================================== */}

            <Box
                sx={{
                    mb: 3,

                    display: "flex",

                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },

                    justifyContent:
                        "space-between",

                    alignItems: {
                        xs: "flex-start",
                        sm: "center",
                    },

                    gap: 2,
                }}
            >

                <Button
                    startIcon={
                        <ArrowBack />
                    }
                    onClick={() =>
                        navigate(
                            "/incidents"
                        )
                    }
                >
                    Back to Incidents
                </Button>


                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                    }}
                >

                    <Button
                        variant="outlined"
                        startIcon={
                            generatingReport ? (
                                <CircularProgress
                                    size={18}
                                />
                            ) : (
                                <PictureAsPdf />
                            )
                        }
                        disabled={
                            generatingReport ||
                            deleting
                        }
                        onClick={
                            handleGenerateReport
                        }
                    >
                        {
                            generatingReport
                                ? "Generating..."
                                : "Generate PDF"
                        }
                    </Button>


                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={
                            deleting ? (
                                <CircularProgress
                                    size={18}
                                />
                            ) : (
                                <Delete />
                            )
                        }
                        disabled={
                            deleting ||
                            generatingReport
                        }
                        onClick={
                            handleDelete
                        }
                    >
                        {
                            deleting
                                ? "Deleting..."
                                : "Delete"
                        }
                    </Button>

                </Box>

            </Box>


            {/* ====================================================
                ERROR
            ==================================================== */}

            {error && (

                <Alert
                    severity="error"
                    sx={{
                        mb: 3,
                    }}
                >
                    {error}
                </Alert>
            )}


            {/* ====================================================
                HEADER
            ==================================================== */}

            <Box
                sx={{
                    mb: 3,
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                    }}
                >

                    <Security
                        color="primary"
                    />

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        Incident Investigation
                    </Typography>

                </Box>

                <Typography
                    variant="body1"
                    color="text.secondary"
                >
                    Security incident analysis
                    and investigation details.
                </Typography>

            </Box>


            {/* ====================================================
                OVERVIEW
            ==================================================== */}

            <Card
                elevation={0}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    border:
                        "1px solid",
                    borderColor:
                        "divider",
                }}
            >

                <CardContent
                    sx={{
                        p: 3,
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                        }}
                    >
                        Incident Overview
                    </Typography>


                    <Grid
                        container
                        spacing={3}
                    >

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Filename
                            </Typography>

                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    mt: 0.5,
                                    wordBreak:
                                        "break-word",
                                }}
                            >
                                {
                                    safeString(
                                        incident.filename,
                                        "Unknown file"
                                    )
                                }
                            </Typography>

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 4,
                                md: 2,
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Severity
                            </Typography>

                            <Chip
                                label={
                                    safeString(
                                        incident.severity,
                                        "Low"
                                    )
                                }
                                color={
                                    getSeverityColor(
                                        safeString(
                                            incident.severity,
                                            "Low"
                                        )
                                    )
                                }
                                sx={{
                                    mt: 1,
                                    fontWeight: 700,
                                }}
                            />

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 4,
                                md: 2,
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Risk Score
                            </Typography>

                            <Chip
                                label={
                                    `${riskScore}/100`
                                }
                                color={
                                    getRiskColor(
                                        riskScore
                                    )
                                }
                                sx={{
                                    mt: 1,
                                    fontWeight: 700,
                                }}
                            />

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 4,
                                md: 2,
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Created At
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    mt: 1,
                                }}
                            >
                                {
                                    formatDate(
                                        incident.created_at
                                    )
                                }
                            </Typography>

                        </Grid>

                    </Grid>

                </CardContent>

            </Card>


            {/* ====================================================
                RISK ASSESSMENT
            ==================================================== */}

            <Card
                elevation={0}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    border:
                        "1px solid",
                    borderColor:
                        "divider",
                }}
            >

                <CardContent
                    sx={{
                        p: 3,
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: {
                                xs:
                                    "flex-start",
                                sm:
                                    "center",
                            },
                            flexDirection: {
                                xs:
                                    "column",
                                sm:
                                    "row",
                            },
                            gap: 2,
                        }}
                    >

                        <Box>

                            <Box
                                sx={{
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    gap: 1,
                                }}
                            >

                                <Speed
                                    color="primary"
                                />

                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight:
                                            700,
                                    }}
                                >
                                    Risk Assessment
                                </Typography>

                            </Box>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 0.5,
                                }}
                            >
                                Risk score based on IOC,
                                threat intelligence
                                and MITRE ATT&CK findings.
                            </Typography>

                        </Box>


                        <Chip
                            label={
                                getRiskLabel(
                                    riskScore
                                )
                            }
                            color={
                                getRiskColor(
                                    riskScore
                                )
                            }
                            sx={{
                                fontWeight: 700,
                            }}
                        />

                    </Box>


                    <Box
                        sx={{
                            mt: 3,
                        }}
                    >

                        <Box
                            sx={{
                                display:
                                    "flex",
                                justifyContent:
                                    "space-between",
                                alignItems:
                                    "baseline",
                                mb: 1,
                            }}
                        >

                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight:
                                        800,
                                }}
                            >

                                {riskScore}

                                <Typography
                                    component="span"
                                    variant="h6"
                                    color="text.secondary"
                                    sx={{
                                        ml: 0.5,
                                    }}
                                >
                                    / 100
                                </Typography>

                            </Typography>


                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Risk Score
                            </Typography>

                        </Box>


                        <Box
                            sx={{
                                width: "100%",
                                height: 12,
                                borderRadius: 10,
                                backgroundColor:
                                    "action.hover",
                                overflow:
                                    "hidden",
                            }}
                        >

                            <Box
                                sx={{
                                    width:
                                        `${riskScore}%`,
                                    height: "100%",
                                    borderRadius: 10,
                                    backgroundColor:
                                        getRiskBarColor(
                                            riskScore
                                        ),
                                    transition:
                                        "width 0.5s ease",
                                }}
                            />

                        </Box>


                        <Box
                            sx={{
                                mt: 1,
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(4, 1fr)",
                                gap: 1,
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="success.main"
                            >
                                0-29 Low
                            </Typography>

                            <Typography
                                variant="caption"
                                color="info.main"
                                sx={{
                                    textAlign:
                                        "center",
                                }}
                            >
                                30-59 Medium
                            </Typography>

                            <Typography
                                variant="caption"
                                color="warning.main"
                                sx={{
                                    textAlign:
                                        "center",
                                }}
                            >
                                60-79 High
                            </Typography>

                            <Typography
                                variant="caption"
                                color="error.main"
                                sx={{
                                    textAlign:
                                        "right",
                                }}
                            >
                                80-100 Critical
                            </Typography>

                        </Box>

                    </Box>

                </CardContent>

            </Card>


            {/* ====================================================
                AI SUMMARY
            ==================================================== */}

            <Card
                elevation={0}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    border:
                        "1px solid",
                    borderColor:
                        "divider",
                }}
            >

                <CardContent
                    sx={{
                        p: 3,
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        AI Analysis Summary
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            lineHeight: 1.8,
                            whiteSpace:
                                "pre-line",
                        }}
                    >
                        {
                            safeString(
                                incident.ai_summary,
                                "No AI summary available."
                            )
                        }
                    </Typography>

                </CardContent>

            </Card>


            {/* ====================================================
                IOC
            ==================================================== */}

            <Card
                elevation={0}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    border:
                        "1px solid",
                    borderColor:
                        "divider",
                }}
            >

                <CardContent
                    sx={{
                        p: 3,
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        Indicators of Compromise
                    </Typography>


                    <Grid
                        container
                        spacing={2}
                    >

                        {[
                            [
                                "IP Addresses",
                                iocs.ips ?? [],
                            ],
                            [
                                "Domains",
                                iocs.domains ?? [],
                            ],
                            [
                                "URLs",
                                iocs.urls ?? [],
                            ],
                            [
                                "Emails",
                                iocs.emails ?? [],
                            ],
                            [
                                "MD5",
                                iocs.md5 ?? [],
                            ],
                            [
                                "SHA1",
                                iocs.sha1 ?? [],
                            ],
                            [
                                "SHA256",
                                iocs.sha256 ?? [],
                            ],
                        ].map(
                            (
                                [label, values]
                            ) => {

                                const safeValues =
                                    Array.isArray(
                                        values
                                    )
                                        ? values
                                        : [];

                                return (

                                    <Grid
                                        key={
                                            safeString(
                                                label
                                            )
                                        }
                                        size={{
                                            xs: 12,
                                            md: 6,
                                        }}
                                    >

                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 2,
                                                border:
                                                    "1px solid",
                                                borderColor:
                                                    "divider",
                                                borderRadius: 2,
                                            }}
                                        >

                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight:
                                                        700,
                                                    mb: 1,
                                                }}
                                            >
                                                {
                                                    safeString(
                                                        label
                                                    )
                                                }
                                            </Typography>


                                            {safeValues.length ===
                                            0 ? (

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    None detected
                                                </Typography>

                                            ) : (

                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",
                                                        gap: 1,
                                                        flexWrap:
                                                            "wrap",
                                                    }}
                                                >

                                                    {
                                                        safeValues.map(
                                                            (
                                                                value,
                                                                index
                                                            ) => (

                                                                <Chip
                                                                    key={`${safeString(
                                                                        value
                                                                    )}-${index}`}
                                                                    label={
                                                                        safeString(
                                                                            value
                                                                        )
                                                                    }
                                                                    size="small"
                                                                    variant="outlined"
                                                                />

                                                            )
                                                        )
                                                    }

                                                </Box>

                                            )}

                                        </Paper>

                                    </Grid>
                                );
                            }
                        )}

                    </Grid>

                </CardContent>

            </Card>


            {/* ====================================================
                THREAT INTELLIGENCE
            ==================================================== */}

            <Card
                elevation={0}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    border:
                        "1px solid",
                    borderColor:
                        "divider",
                }}
            >

                <CardContent
                    sx={{
                        p: 3,
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        Threat Intelligence
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                            mb: 3,
                        }}
                    >
                        Enrichment results for indicators
                        identified during incident analysis.
                    </Typography>


                    {threats.length === 0 ? (

                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                textAlign:
                                    "center",
                                border:
                                    "1px solid",
                                borderColor:
                                    "divider",
                                borderRadius: 2,
                            }}
                        >

                            <Typography
                                color="text.secondary"
                            >
                                No threat intelligence
                                findings available.
                            </Typography>

                        </Paper>

                    ) : (

                        <Grid
                            container
                            spacing={2}
                        >

                            {threats.map(
                                (
                                    threat,
                                    index
                                ) => {

                                    const malicious =
                                        threat?.malicious ===
                                        true;

                                    const suspicious =
                                        threat?.suspicious ===
                                        true;

                                    const provider =
                                        safeString(
                                            threat?.provider,
                                            "Threat Intelligence"
                                        );

                                    const indicator =
                                        safeString(
                                            threat?.indicator,
                                            "Unknown"
                                        );

                                    const status =
                                        safeString(
                                            threat?.status,
                                            "Unknown"
                                        );

                                    const source =
                                        safeString(
                                            threat?.source,
                                            "N/A"
                                        );

                                    const reputation =
                                        typeof threat?.reputation ===
                                        "number"
                                            ? threat.reputation
                                            : null;

                                    const detectionCount =
                                        typeof threat?.detection_count ===
                                        "number"
                                            ? threat.detection_count
                                            : null;


                                    return (

                                        <Grid
                                            key={index}
                                            size={{
                                                xs: 12,
                                                md: 6,
                                            }}
                                        >

                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    p: 2.5,
                                                    border:
                                                        "1px solid",
                                                    borderColor:
                                                        malicious
                                                            ? "error.light"
                                                            : suspicious
                                                            ? "warning.light"
                                                            : "divider",
                                                    borderRadius: 2,
                                                    height:
                                                        "100%",
                                                }}
                                            >

                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems:
                                                            "center",
                                                        gap: 1,
                                                        mb: 2,
                                                    }}
                                                >

                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            fontWeight:
                                                                700,
                                                        }}
                                                    >
                                                        {
                                                            provider
                                                        }
                                                    </Typography>

                                                    <Chip
                                                        label={
                                                            status
                                                        }
                                                        size="small"
                                                        color={
                                                            status ===
                                                            "Success"
                                                                ? "success"
                                                                : "default"
                                                        }
                                                    />

                                                </Box>


                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    Indicator
                                                </Typography>


                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight:
                                                            600,
                                                        wordBreak:
                                                            "break-all",
                                                        mb: 2,
                                                    }}
                                                >
                                                    {
                                                        indicator
                                                    }
                                                </Typography>


                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",
                                                        flexWrap:
                                                            "wrap",
                                                        gap: 1,
                                                        mb: 2,
                                                    }}
                                                >

                                                    <Chip
                                                        label={
                                                            malicious
                                                                ? "Malicious"
                                                                : "Not Malicious"
                                                        }
                                                        size="small"
                                                        color={
                                                            malicious
                                                                ? "error"
                                                                : "success"
                                                        }
                                                    />

                                                    <Chip
                                                        label={
                                                            suspicious
                                                                ? "Suspicious"
                                                                : "Not Suspicious"
                                                        }
                                                        size="small"
                                                        color={
                                                            suspicious
                                                                ? "warning"
                                                                : "success"
                                                        }
                                                    />

                                                </Box>


                                                <Grid
                                                    container
                                                    spacing={2}
                                                >

                                                    <Grid
                                                        size={{
                                                            xs: 12,
                                                            sm: 4,
                                                        }}
                                                    >

                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            Detection Count
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                fontWeight:
                                                                    700,
                                                                mt: 0.5,
                                                            }}
                                                        >
                                                            {
                                                                detectionCount ??
                                                                "N/A"
                                                            }
                                                        </Typography>

                                                    </Grid>


                                                    <Grid
                                                        size={{
                                                            xs: 12,
                                                            sm: 4,
                                                        }}
                                                    >

                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            Reputation
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                fontWeight:
                                                                    700,
                                                                mt: 0.5,
                                                            }}
                                                        >
                                                            {
                                                                reputation ??
                                                                "N/A"
                                                            }
                                                        </Typography>

                                                    </Grid>


                                                    <Grid
                                                        size={{
                                                            xs: 12,
                                                            sm: 4,
                                                        }}
                                                    >

                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            Source
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                fontWeight:
                                                                    700,
                                                                mt: 0.5,
                                                            }}
                                                        >
                                                            {
                                                                source
                                                            }
                                                        </Typography>

                                                    </Grid>

                                                </Grid>

                                            </Paper>

                                        </Grid>
                                    );
                                }
                            )}

                        </Grid>
                    )}

                </CardContent>

            </Card>


            {/* ====================================================
                MITRE ATT&CK
            ==================================================== */}

            <Card
                elevation={0}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    border:
                        "1px solid",
                    borderColor:
                        "divider",
                }}
            >

                <CardContent
                    sx={{
                        p: 3,
                    }}
                >

                    <Box
                        sx={{
                            display:
                                "flex",
                            justifyContent:
                                "space-between",
                            alignItems: {
                                xs:
                                    "flex-start",
                                sm:
                                    "center",
                            },
                            flexDirection: {
                                xs:
                                    "column",
                                sm:
                                    "row",
                            },
                            gap: 2,
                            mb: 1,
                        }}
                    >

                        <Box>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight:
                                        700,
                                }}
                            >
                                MITRE ATT&CK Mapping
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 0.5,
                                }}
                            >
                                Techniques identified from
                                the analyzed security log.
                            </Typography>

                        </Box>


                        <Box
                            sx={{
                                display:
                                    "flex",
                                gap: 1,
                                flexWrap:
                                    "wrap",
                            }}
                        >

                            <Chip
                                label={
                                    `${mitre.length} Techniques`
                                }
                                size="small"
                                color="primary"
                                variant="outlined"
                            />

                            <Chip
                                label={
                                    `${tacticCount} Tactics`
                                }
                                size="small"
                                variant="outlined"
                            />

                        </Box>

                    </Box>


                    {mitre.length === 0 ? (

                        <Paper
                            elevation={0}
                            sx={{
                                mt: 3,
                                p: 3,
                                textAlign:
                                    "center",
                                border:
                                    "1px solid",
                                borderColor:
                                    "divider",
                                borderRadius: 2,
                            }}
                        >

                            <Typography
                                color="text.secondary"
                            >
                                No MITRE ATT&CK techniques
                                mapped.
                            </Typography>

                        </Paper>

                    ) : (

                        <Box
                            sx={{
                                mt: 3,
                            }}
                        >

                            {Object.entries(
                                mitreByTactic
                            ).map(
                                (
                                    [
                                        tactic,
                                        techniques,
                                    ]
                                ) => (

                                    <Box
                                        key={tactic}
                                        sx={{
                                            mb: 3,
                                            "&:last-child":
                                                {
                                                    mb: 0,
                                                },
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap: 1,
                                                mb: 1.5,
                                            }}
                                        >

                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    fontWeight:
                                                        700,
                                                }}
                                            >
                                                {tactic}
                                            </Typography>

                                            <Chip
                                                label={
                                                    techniques.length
                                                }
                                                size="small"
                                                variant="outlined"
                                            />

                                        </Box>


                                        <Grid
                                            container
                                            spacing={2}
                                        >

                                            {techniques.map(
                                                (
                                                    technique,
                                                    index
                                                ) => (

                                                    <Grid
                                                        key={`${safeString(
                                                            technique.id
                                                        )}-${index}`}
                                                        size={{
                                                            xs: 12,
                                                            md: 6,
                                                        }}
                                                    >

                                                        <Paper
                                                            elevation={0}
                                                            sx={{
                                                                p: 2,
                                                                border:
                                                                    "1px solid",
                                                                borderColor:
                                                                    "divider",
                                                                borderRadius:
                                                                    2,

                                                                transition:
                                                                    "all 0.2s ease",

                                                                "&:hover":
                                                                    {
                                                                        borderColor:
                                                                            "primary.main",
                                                                        transform:
                                                                            "translateY(-2px)",
                                                                    },
                                                            }}
                                                        >

                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    justifyContent:
                                                                        "space-between",
                                                                    alignItems:
                                                                        "flex-start",
                                                                    gap: 1,
                                                                    mb: 1.5,
                                                                }}
                                                            >

                                                                <Chip
                                                                    label={
                                                                        safeString(
                                                                            technique.id
                                                                        )
                                                                    }
                                                                    color="primary"
                                                                    size="small"
                                                                />

                                                                <Chip
                                                                    label={
                                                                        safeString(
                                                                            technique.tactic
                                                                        )
                                                                    }
                                                                    size="small"
                                                                    variant="outlined"
                                                                />

                                                            </Box>


                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{
                                                                    fontWeight:
                                                                        700,
                                                                }}
                                                            >
                                                                {
                                                                    safeString(
                                                                        technique.name
                                                                    )
                                                                }
                                                            </Typography>


                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                                sx={{
                                                                    mt: 0.5,
                                                                }}
                                                            >
                                                                MITRE ATT&CK
                                                                technique
                                                            </Typography>

                                                        </Paper>

                                                    </Grid>

                                                )
                                            )}

                                        </Grid>

                                    </Box>

                                )
                            )}

                        </Box>
                    )}

                </CardContent>

            </Card>


            {/* ====================================================
                RECOMMENDATIONS
            ==================================================== */}

            <Card
                elevation={0}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    border:
                        "1px solid",
                    borderColor:
                        "divider",
                }}
            >

                <CardContent
                    sx={{
                        p: 3,
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight:
                                700,
                            mb: 2,
                        }}
                    >
                        Security Recommendations
                    </Typography>


                    {recommendations.length ===
                    0 ? (

                        <Typography
                            color="text.secondary"
                        >
                            No security recommendations
                            available.
                        </Typography>

                    ) : (

                        <Box
                            sx={{
                                display:
                                    "flex",
                                flexDirection:
                                    "column",
                                gap: 2,
                            }}
                        >

                            {recommendations.map(
                                (
                                    recommendation,
                                    index
                                ) => (

                                    <Paper
                                        key={index}
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            border:
                                                "1px solid",
                                            borderColor:
                                                "divider",
                                            borderRadius:
                                                2,
                                        }}
                                    >

                                        <Typography
                                            variant="body1"
                                            sx={{
                                                lineHeight:
                                                    1.7,
                                            }}
                                        >
                                            {
                                                safeString(
                                                    recommendation
                                                )
                                            }
                                        </Typography>

                                    </Paper>

                                )
                            )}

                        </Box>
                    )}

                </CardContent>

            </Card>


            {/* ====================================================
                FOOTER
            ==================================================== */}

            <Divider
                sx={{
                    mt: 4,
                    mb: 2,
                }}
            />

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    textAlign:
                        "center",
                    pb: 3,
                }}
            >
                SentinelAI SOC • Security Incident Investigation
            </Typography>

        </Box>
    );
}


export default IncidentDetails;