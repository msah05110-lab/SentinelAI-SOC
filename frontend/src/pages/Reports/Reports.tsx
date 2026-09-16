import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    InputAdornment,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    Description,
    Download,
    PictureAsPdf,
    Refresh,
    Search,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import type { Incident } from "../../types/incident";

import {
    getIncidents,
    generateIncidentReport,
} from "../../services/incidentService";


function Reports() {

    const navigate = useNavigate();

    const [incidents, setIncidents] =
        useState<Incident[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [severityFilter, setSeverityFilter] =
        useState("All");

    const [generatingId, setGeneratingId] =
        useState<number | null>(null);


    // ============================================================
    // LOAD INCIDENTS
    // ============================================================

    async function loadReports(
        showRefreshLoader = false
    ) {

        try {

            if (showRefreshLoader) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const data =
                await getIncidents();

            const sorted =
                [...data].sort(
                    (a, b) =>
                        new Date(
                            b.created_at
                        ).getTime() -
                        new Date(
                            a.created_at
                        ).getTime()
                );

            setIncidents(sorted);

        } catch (err) {

            console.error(
                "Failed to load reports:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load reports."
            );

        } finally {

            setLoading(false);

            setRefreshing(false);

        }

    }


    // ============================================================
    // INITIAL LOAD
    // ============================================================

    useEffect(() => {

        loadReports();

    }, []);


    // ============================================================
    // FILTER
    // ============================================================

    const filteredIncidents =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();

            return incidents.filter(
                (incident) => {

                    const matchesSearch =
                        !query ||
                        incident.filename
                            .toLowerCase()
                            .includes(query) ||
                        incident.severity
                            .toLowerCase()
                            .includes(query) ||
                        (
                            incident.ai_summary ??
                            ""
                        )
                            .toLowerCase()
                            .includes(query);

                    const matchesSeverity =
                        severityFilter ===
                            "All" ||
                        incident.severity ===
                            severityFilter;

                    return (
                        matchesSearch &&
                        matchesSeverity
                    );

                }
            );

        }, [
            incidents,
            search,
            severityFilter,
        ]);


    // ============================================================
    // GENERATE PDF
    // ============================================================

    async function handleGenerateReport(
        id: number
    ) {

        try {

            setGeneratingId(id);

            setError("");

            await generateIncidentReport(id);

        } catch (err) {

            console.error(
                "Failed to generate PDF:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to generate PDF report."
            );

        } finally {

            setGeneratingId(null);

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

            case "Low":
            default:
                return "success";
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
                    Loading reports...
                </Typography>

            </Box>
        );
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
                    mb: 4,
                }}
            >

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                    sx={{
                        justifyContent:
                            "space-between",
                        alignItems: {
                            xs: "flex-start",
                            sm: "center",
                        },
                    }}
                >

                    <Box>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                alignItems:
                                    "center",
                                mb: 0.5,
                            }}
                        >

                            <Description
                                color="primary"
                            />

                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Security Reports
                            </Typography>

                        </Stack>


                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            Generate and download
                            incident investigation
                            reports.
                        </Typography>

                    </Box>


                    <Button
                        variant="outlined"
                        startIcon={
                            refreshing ? (
                                <CircularProgress
                                    size={18}
                                />
                            ) : (
                                <Refresh />
                            )
                        }
                        disabled={refreshing}
                        onClick={() =>
                            loadReports(true)
                        }
                    >
                        Refresh
                    </Button>

                </Stack>

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
                FILTERS
            ==================================================== */}

            <Card
                elevation={0}
                sx={{
                    mb: 3,

                    border: "1px solid",

                    borderColor:
                        "divider",

                    borderRadius: 3,
                }}
            >

                <CardContent>

                    <Box
                        sx={{
                            display: "flex",

                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },

                            gap: 2,

                            alignItems: {
                                xs: "stretch",
                                md: "center",
                            },
                        }}
                    >

                        <TextField
                            fullWidth
                            size="small"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search filename, severity or summary..."
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment
                                            position="start"
                                        >
                                            <Search
                                                fontSize="small"
                                            />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />


                        <Select
                            size="small"
                            value={
                                severityFilter
                            }
                            onChange={(event) =>
                                setSeverityFilter(
                                    event.target.value
                                )
                            }
                            sx={{
                                minWidth: 180,
                            }}
                        >

                            <MenuItem value="All">
                                All Severities
                            </MenuItem>

                            <MenuItem value="Critical">
                                Critical
                            </MenuItem>

                            <MenuItem value="High">
                                High
                            </MenuItem>

                            <MenuItem value="Medium">
                                Medium
                            </MenuItem>

                            <MenuItem value="Low">
                                Low
                            </MenuItem>

                        </Select>

                    </Box>

                </CardContent>

            </Card>


            {/* ====================================================
                REPORT LIST
            ==================================================== */}

            <Card
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >

                <CardContent
                    sx={{
                        p: 0,
                    }}
                >

                    {/* HEADER */}

                    <Box
                        sx={{
                            p: {
                                xs: 2,
                                md: 3,
                            },

                            borderBottom:
                                "1px solid",

                            borderColor:
                                "divider",
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            Available Incident Reports
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 0.5,
                            }}
                        >
                            {
                                filteredIncidents.length
                            }{" "}
                            reportable incident
                            {filteredIncidents.length ===
                            1
                                ? ""
                                : "s"}{" "}
                            available.
                        </Typography>

                    </Box>


                    {/* EMPTY */}

                    {filteredIncidents.length ===
                    0 ? (

                        <Box
                            sx={{
                                py: 7,
                                px: 3,
                                textAlign:
                                    "center",
                            }}
                        >

                            <PictureAsPdf
                                sx={{
                                    fontSize: 48,
                                    color:
                                        "text.disabled",
                                    mb: 1,
                                }}
                            />

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                }}
                            >
                                No reports found
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{
                                    mt: 0.5,
                                }}
                            >
                                Try changing your
                                search or severity
                                filter.
                            </Typography>

                        </Box>

                    ) : (

                        <Stack>

                            {filteredIncidents.map(
                                (
                                    incident,
                                    index
                                ) => (

                                    <Box
                                        key={
                                            incident.id
                                        }
                                        sx={{
                                            p: {
                                                xs: 2,
                                                md: 3,
                                            },

                                            borderBottom:
                                                index !==
                                                filteredIncidents.length -
                                                    1
                                                    ? "1px solid"
                                                    : "none",

                                            borderColor:
                                                "divider",
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                display:
                                                    "flex",

                                                flexDirection:
                                                    {
                                                        xs: "column",
                                                        md: "row",
                                                    },

                                                gap: 2,

                                                alignItems:
                                                    {
                                                        xs: "flex-start",
                                                        md: "center",
                                                    },

                                                justifyContent:
                                                    "space-between",
                                            }}
                                        >

                                            {/* INFO */}

                                            <Box
                                                sx={{
                                                    flex: 1,
                                                    minWidth: 0,
                                                }}
                                            >

                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight:
                                                            700,

                                                        wordBreak:
                                                            "break-word",
                                                    }}
                                                >
                                                    {
                                                        incident.filename
                                                    }
                                                </Typography>


                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    sx={{
                                                        mt: 1,

                                                        alignItems:
                                                            "center",
                                                    }}
                                                >

                                                    <Chip
                                                        label={
                                                            incident.severity
                                                        }
                                                        size="small"
                                                        color={getSeverityColor(
                                                            incident.severity
                                                        )}
                                                    />


                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {new Date(
                                                            incident.created_at
                                                        ).toLocaleString()}
                                                    </Typography>

                                                </Stack>


                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        mt: 1,

                                                        lineHeight:
                                                            1.7,

                                                        display:
                                                            "-webkit-box",

                                                        WebkitLineClamp:
                                                            2,

                                                        WebkitBoxOrient:
                                                            "vertical",

                                                        overflow:
                                                            "hidden",
                                                    }}
                                                >
                                                    {
                                                        incident.ai_summary ||
                                                        "No AI summary available."
                                                    }
                                                </Typography>

                                            </Box>


                                            {/* ACTIONS */}

                                            <Box
                                                sx={{
                                                    display:
                                                        "flex",

                                                    gap: 1,

                                                    flexWrap:
                                                        "wrap",
                                                }}
                                            >

                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() =>
                                                        navigate(
                                                            `/incidents/${incident.id}`
                                                        )
                                                    }
                                                >
                                                    View Incident
                                                </Button>


                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    startIcon={
                                                        generatingId ===
                                                        incident.id ? (
                                                            <CircularProgress
                                                                size={
                                                                    16
                                                                }
                                                                color="inherit"
                                                            />
                                                        ) : (
                                                            <Download />
                                                        )
                                                    }
                                                    disabled={
                                                        generatingId !==
                                                        null
                                                    }
                                                    onClick={() =>
                                                        handleGenerateReport(
                                                            incident.id
                                                        )
                                                    }
                                                >
                                                    {generatingId ===
                                                    incident.id
                                                        ? "Generating..."
                                                        : "Generate PDF"}
                                                </Button>

                                            </Box>

                                        </Box>

                                    </Box>

                                )
                            )}

                        </Stack>

                    )}

                </CardContent>

            </Card>


            {/* ====================================================
                FOOTER
            ==================================================== */}

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    textAlign: "center",
                    py: 3,
                }}
            >
                SentinelAI SOC • Security Reports
            </Typography>

        </Box>
    );
}


export default Reports;