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
    TextField,
    Typography,
} from "@mui/material";

import {
    Add,
    ErrorOutlined,
    Refresh,
    Search,
    Security,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import IncidentTable from "../../components/incidents/IncidentTable";

import {
    deleteIncident,
    getIncidents,
} from "../../services/incidentService";

import type { Incident } from "../../types/incident";


function Incidents() {

    const navigate = useNavigate();


    // ============================================================
    // STATE
    // ============================================================

    const [incidents, setIncidents] =
        useState<Incident[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [deletingId, setDeletingId] =
        useState<number | null>(null);


    // ============================================================
    // LOAD INCIDENTS
    // ============================================================

    async function loadIncidents() {

        try {

            setLoading(true);

            setError("");

            const data =
                await getIncidents();

            setIncidents(data);

        } catch (err) {

            console.error(
                "Failed to load incidents:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load incidents."
            );

        } finally {

            setLoading(false);

        }
    }


    // ============================================================
    // INITIAL LOAD
    // ============================================================

    useEffect(() => {

        loadIncidents();

    }, []);


    // ============================================================
    // DELETE INCIDENT
    // ============================================================

    async function handleDeleteIncident(
        id: number
    ) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this incident?"
            );

        if (!confirmed) {
            return;
        }


        try {

            setDeletingId(id);

            setError("");

            await deleteIncident(id);

            setIncidents(
                (current) =>
                    current.filter(
                        (incident) =>
                            incident.id !== id
                    )
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

            setDeletingId(null);

        }

    }


    // ============================================================
    // FILTER INCIDENTS
    // ============================================================

    const filteredIncidents =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();

            if (!query) {
                return incidents;
            }

            return incidents.filter(
                (incident) => {

                    const filename =
                        incident.filename
                            ?.toLowerCase() ?? "";

                    const severity =
                        incident.severity
                            ?.toLowerCase() ?? "";

                    const summary =
                        incident.ai_summary
                            ?.toLowerCase() ?? "";

                    return (
                        filename.includes(query) ||
                        severity.includes(query) ||
                        summary.includes(query)
                    );
                }
            );

        }, [incidents, search]);


    // ============================================================
    // INCIDENT STATISTICS
    // ============================================================

    const totalIncidents =
        incidents.length;

    const criticalIncidents =
        incidents.filter(
            (incident) =>
                incident.severity === "Critical"
        ).length;

    const highIncidents =
        incidents.filter(
            (incident) =>
                incident.severity === "High"
        ).length;

    const mediumIncidents =
        incidents.filter(
            (incident) =>
                incident.severity === "Medium"
        ).length;


    // ============================================================
    // PAGE
    // ============================================================

    return (

        <Box
            sx={{
                width: "100%",
                minHeight: "100%",
                boxSizing: "border-box",
                p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },
            }}
        >

            {/* ====================================================
                PAGE HEADER
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
                        gap: 1.5,
                        mb: 1,
                    }}
                >

                    <Security
                        color="primary"
                        sx={{
                            fontSize: 32,
                        }}
                    />

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        Incident Management
                    </Typography>

                </Box>


                <Typography
                    variant="body1"
                    color="text.secondary"
                >
                    Monitor, investigate and manage
                    security incidents detected by
                    SentinelAI SOC.
                </Typography>

            </Box>


            {/* ====================================================
                ERROR MESSAGE
            ==================================================== */}

            {error && (

                <Alert
                    severity="error"
                    icon={<ErrorOutlined />}
                    sx={{
                        mb: 3,
                    }}
                >
                    {error}
                </Alert>

            )}


            {/* ====================================================
                STATISTICS
            ==================================================== */}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)",
                    },
                    gap: 2,
                    mb: 3,
                }}
            >

                {/* TOTAL */}

                <Card
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mb: 1,
                            }}
                        >
                            Total Incidents
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            {totalIncidents}
                        </Typography>

                    </CardContent>

                </Card>


                {/* CRITICAL */}

                <Card
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mb: 1,
                            }}
                        >
                            Critical
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            {criticalIncidents}
                        </Typography>

                        <Chip
                            label="Critical"
                            size="small"
                            color="error"
                            sx={{
                                mt: 1,
                            }}
                        />

                    </CardContent>

                </Card>


                {/* HIGH */}

                <Card
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mb: 1,
                            }}
                        >
                            High Severity
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            {highIncidents}
                        </Typography>

                        <Chip
                            label="High"
                            size="small"
                            color="warning"
                            sx={{
                                mt: 1,
                            }}
                        />

                    </CardContent>

                </Card>


                {/* MEDIUM */}

                <Card
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mb: 1,
                            }}
                        >
                            Medium Severity
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            {mediumIncidents}
                        </Typography>

                        <Chip
                            label="Medium"
                            size="small"
                            color="info"
                            sx={{
                                mt: 1,
                            }}
                        />

                    </CardContent>

                </Card>

            </Box>


            {/* ====================================================
                SEARCH + ACTIONS
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
                            justifyContent:
                                "space-between",
                        }}
                    >

                        {/* SEARCH */}

                        <Box
                            sx={{
                                flex: 1,
                                width: "100%",
                            }}
                        >

                            <TextField
                                fullWidth
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                                placeholder="Search incidents..."
                                size="small"
                                sx={{
                                    maxWidth: {
                                        md: 550,
                                    },
                                }}
                            />

                        </Box>


                        {/* ACTIONS */}

                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                flexWrap: "wrap",
                            }}
                        >

                            <Button
                                variant="outlined"
                                startIcon={<Refresh />}
                                onClick={
                                    loadIncidents
                                }
                                disabled={loading}
                            >
                                Refresh
                            </Button>


                            {/* NEW INCIDENT */}

                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() =>
                                    navigate(
                                        "/incidents/upload"
                                    )
                                }
                            >
                                New Incident
                            </Button>

                        </Box>

                    </Box>


                    {/* SEARCH RESULT INFO */}

                    {!loading && (

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 2,
                            }}
                        >
                            Showing{" "}
                            <strong>
                                {filteredIncidents.length}
                            </strong>{" "}
                            of{" "}
                            <strong>
                                {incidents.length}
                            </strong>{" "}
                            incidents
                        </Typography>

                    )}

                </CardContent>

            </Card>


            {/* ====================================================
                DIVIDER
            ==================================================== */}

            <Divider
                sx={{
                    mb: 3,
                }}
            />


            {/* ====================================================
                LOADING
            ==================================================== */}

            {loading && (

                <Card
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                    }}
                >

                    <CardContent>

                        <Box
                            sx={{
                                minHeight: 250,
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
                                Loading incidents...
                            </Typography>

                        </Box>

                    </CardContent>

                </Card>

            )}


            {/* ====================================================
                INCIDENT TABLE
            ==================================================== */}

            {!loading && (

                <Box
                    sx={{
                        width: "100%",
                        overflowX: "auto",
                    }}
                >

                    <IncidentTable
                        incidents={
                            filteredIncidents
                        }
                        onDelete={
                            deletingId !== null
                                ? undefined
                                : handleDeleteIncident
                        }
                    />

                </Box>

            )}


            {/* ====================================================
                EMPTY SEARCH RESULT
            ==================================================== */}

            {!loading &&
                incidents.length > 0 &&
                filteredIncidents.length === 0 && (

                    <Card
                        elevation={0}
                        sx={{
                            mt: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                        }}
                    >

                        <CardContent>

                            <Box
                                sx={{
                                    py: 4,
                                    textAlign: "center",
                                }}
                            >

                                <Search
                                    sx={{
                                        fontSize: 45,
                                        color:
                                            "text.secondary",
                                        mb: 1,
                                    }}
                                />

                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                    }}
                                >
                                    No matching incidents
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt: 0.5,
                                    }}
                                >
                                    Try a different
                                    filename, severity
                                    or search term.
                                </Typography>

                                <Button
                                    sx={{
                                        mt: 2,
                                    }}
                                    onClick={() =>
                                        setSearch("")
                                    }
                                >
                                    Clear Search
                                </Button>

                            </Box>

                        </CardContent>

                    </Card>

                )}


            {/* ====================================================
                FOOTER
            ==================================================== */}

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    textAlign: "center",
                    mt: 4,
                    pb: 2,
                }}
            >
                SentinelAI SOC • Incident Management
            </Typography>

        </Box>

    );
}


export default Incidents;