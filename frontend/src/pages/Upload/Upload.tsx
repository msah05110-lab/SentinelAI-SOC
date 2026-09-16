import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    ArrowBack,
    CloudUpload,
    Description,
    Security,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import {
    analyzeIncident,
} from "../../services/incidentService";

import IncidentAnalysisPanel from "../../components/incidents/IncidentAnalysisPanel";

import type {
    IncidentIOC,
    MITRETechnique,
    ThreatIntel,
} from "../../types/incident";


interface AnalysisResult {
    iocs: IncidentIOC;
    threats: ThreatIntel[];
    mitre: MITRETechnique[];
    severity: string;
    ai_summary: string;
    recommendations: string[];
}


function Upload() {

    const navigate = useNavigate();

    const [file, setFile] =
        useState<File | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [result, setResult] =
        useState<AnalysisResult | null>(null);


    // ============================================================
    // FILE SELECT
    // ============================================================

    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const selectedFile =
            event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        setFile(selectedFile);

        setError("");

        setResult(null);
    }


    // ============================================================
    // ANALYZE
    // ============================================================

    async function handleAnalyze() {

        if (!file) {

            setError(
                "Please select a security log file."
            );

            return;
        }

        try {

            setLoading(true);

            setError("");

            setResult(null);


            const response =
                await analyzeIncident(file);


            if (
                !response ||
                !response.incident
            ) {

                throw new Error(
                    "Invalid analysis response from server."
                );

            }


            setResult(
                response.incident
            );

        } catch (err) {

            console.error(
                "Incident analysis failed:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Incident analysis failed."
            );

        } finally {

            setLoading(false);

        }
    }


    // ============================================================
    // SEVERITY COLOR
    // ============================================================

    function getSeverityColor(
        severity: string
    ):
        | "error"
        | "warning"
        | "info"
        | "success" {

        switch (severity) {

            case "Critical":
                return "error";

            case "High":
                return "warning";

            case "Medium":
                return "info";

            default:
                return "success";
        }
    }


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
                HEADER
            ==================================================== */}

            <Box
                sx={{
                    mb: 3,
                }}
            >

                <Button
                    startIcon={
                        <ArrowBack />
                    }
                    onClick={() =>
                        navigate("/incidents")
                    }
                    sx={{
                        mb: 2,
                    }}
                >
                    Back to Incidents
                </Button>


                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        alignItems: "center",
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
                        Analyze Security Log
                    </Typography>

                </Stack>


                <Typography
                    color="text.secondary"
                >
                    Upload a security log and let
                    SentinelAI analyze IOCs, threats,
                    MITRE ATT&CK techniques and severity.
                </Typography>

            </Box>


            {/* ====================================================
                UPLOAD CARD
            ==================================================== */}

            <Card
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    mb: 3,
                }}
            >

                <CardContent
                    sx={{
                        p: {
                            xs: 2,
                            md: 3,
                        },
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            mb: 1,
                        }}
                    >
                        Security Log Upload
                    </Typography>


                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 3,
                        }}
                    >
                        Supported formats: TXT, LOG,
                        CSV and JSON.
                    </Typography>


                    {/* FILE INPUT */}

                    <Paper
                        elevation={0}
                        sx={{
                            border: "2px dashed",
                            borderColor:
                                "divider",
                            borderRadius: 3,
                            p: 4,
                            textAlign: "center",
                            mb: 2,
                        }}
                    >

                        <CloudUpload
                            color="primary"
                            sx={{
                                fontSize: 50,
                                mb: 1,
                            }}
                        />


                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            Select Security Log
                        </Typography>


                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 0.5,
                                mb: 2,
                            }}
                        >
                            Maximum file size: 50 MB
                        </Typography>


                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={
                                <Description />
                            }
                        >
                            Choose File

                            <input
                                hidden
                                type="file"
                                accept=".txt,.log,.csv,.json"
                                onChange={
                                    handleFileChange
                                }
                            />
                        </Button>


                        {file && (

                            <Box sx={{ mt: 2 }}>

                                <Chip
                                    label={
                                        file.name
                                    }
                                    color="primary"
                                    variant="outlined"
                                />

                            </Box>

                        )}

                    </Paper>


                    {/* ERROR */}

                    {error && (

                        <Alert
                            severity="error"
                            sx={{
                                mb: 2,
                            }}
                        >
                            {error}
                        </Alert>

                    )}


                    {/* ANALYZE BUTTON */}

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={
                            !file || loading
                        }
                        startIcon={
                            loading ? (
                                <CircularProgress
                                    size={18}
                                    color="inherit"
                                />
                            ) : (
                                <Security />
                            )
                        }
                        onClick={
                            handleAnalyze
                        }
                    >
                        {loading
                            ? "Analyzing Security Log..."
                            : "Analyze Security Log"}
                    </Button>

                </CardContent>

            </Card>


            {/* ====================================================
                ANALYSIS RESULT
            ==================================================== */}

            {result && (

                <Box>

                    <Card
                        elevation={0}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                            mb: 3,
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                }}
                            >
                                Analysis Complete
                            </Typography>


                            <Divider
                                sx={{
                                    mb: 2,
                                }}
                            />


                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    },
                                    gap: 2,
                                    alignItems: {
                                        xs: "flex-start",
                                        sm: "center",
                                    },
                                }}
                            >

                                <Box
                                    sx={{
                                        flex: 1,
                                    }}
                                >

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Detected Severity
                                    </Typography>


                                    <Chip
                                        label={
                                            result.severity
                                        }
                                        color={
                                            getSeverityColor(
                                                result.severity
                                            )
                                        }
                                        sx={{
                                            mt: 1,
                                            fontWeight: 700,
                                        }}
                                    />

                                </Box>


                                <Box
                                    sx={{
                                        flex: 2,
                                    }}
                                >

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        AI Summary
                                    </Typography>


                                    <Typography
                                        sx={{
                                            mt: 1,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {
                                            result.ai_summary
                                        }
                                    </Typography>

                                </Box>

                            </Box>

                        </CardContent>

                    </Card>


                    {/* DETAILED ANALYSIS */}

                    <IncidentAnalysisPanel
                        iocs={result.iocs}
                        threats={result.threats}
                        mitre={result.mitre}
                        recommendations={
                            result.recommendations
                        }
                    />

                </Box>

            )}

        </Box>
    );
}


export default Upload;