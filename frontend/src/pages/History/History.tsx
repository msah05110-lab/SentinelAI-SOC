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
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    AccessTime,
    ArrowForward,
    Delete,
    History as HistoryIcon,
    Refresh,
    Search,
    Security,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import {
    deleteHistoryIncident,
    getHistory,
} from "../../services/historyService";

import type {
    HistoryIncident,
} from "../../services/historyService";


function History() {

    const navigate = useNavigate();

    // ============================================================
    // STATE
    // ============================================================

    const [incidents, setIncidents] =
        useState<HistoryIncident[]>([]);

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

    const [deletingId, setDeletingId] =
        useState<number | null>(null);


    // ============================================================
    // LOAD HISTORY
    // ============================================================

    async function loadHistory(
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
                await getHistory();

            const sortedData =
                [...data].sort(
                    (a, b) =>
                        new Date(
                            b.created_at
                        ).getTime() -
                        new Date(
                            a.created_at
                        ).getTime()
                );

            setIncidents(
                sortedData
            );

        } catch (err) {

            console.error(
                "Failed to load incident history:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load incident history."
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

        loadHistory();

    }, []);


    // ============================================================
    // DELETE
    // ============================================================

    async function handleDelete(
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

            await deleteHistoryIncident(
                id
            );

            setIncidents(
                current =>
                    current.filter(
                        incident =>
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
    // FILTERED HISTORY
    // ============================================================

    const filteredIncidents =
        useMemo(() => {

            const query =
                search.trim().toLowerCase();

            return incidents.filter(
                incident => {

                    const filename =
                        incident.filename
                            .toLowerCase();

                    const summary =
                        (
                            incident.ai_summary ??
                            ""
                        ).toLowerCase();

                    const severity =
                        incident.severity
                            .toLowerCase();

                    const matchesSearch =
                        !query ||
                        filename.includes(query) ||
                        summary.includes(query) ||
                        severity.includes(query);

                    const matchesSeverity =
                        severityFilter === "All" ||
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
                    Loading incident history...
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

                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems: {
                        xs: "flex-start",
                        md: "center",
                    },

                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },

                    gap: 2,
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

                        <HistoryIcon
                            color="primary"
                        />

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                letterSpacing:
                                    "-0.5px",
                            }}
                        >
                            Incident History
                        </Typography>

                    </Stack>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                    >
                        Review and investigate
                        previously analyzed
                        security incidents.
                    </Typography>

                </Box>


                <Chip
                    icon={<Security />}
                    label={
                        `${incidents.length} Incidents`
                    }
                    color="primary"
                    variant="outlined"
                    sx={{
                        fontWeight: 700,
                    }}
                />

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
                    action={

                        <Button
                            color="inherit"
                            size="small"
                            onClick={() =>
                                loadHistory(true)
                            }
                        >
                            Retry
                        </Button>

                    }
                >
                    {error}
                </Alert>

            )}


            {/* ====================================================
                FILTER CARD
            ==================================================== */}

            <Card
                elevation={0}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >

                <CardContent>

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={2}
                        sx={{
                            alignItems: {
                                xs: "stretch",
                                md: "center",
                            },
                        }}
                    >

                        {/* SEARCH */}

                        <TextField
                            fullWidth
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder={
                                "Search filename, severity or AI summary..."
                            }
                            size="small"
                            sx={{
                                flex: 1,
                            }}
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


                        {/* SEVERITY */}

                        <Select
                            value={
                                severityFilter
                            }
                            onChange={(event) =>
                                setSeverityFilter(
                                    event.target.value
                                )
                            }
                            size="small"
                            sx={{
                                minWidth: {
                                    xs: "100%",
                                    md: 160,
                                },
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


                        {/* REFRESH */}

                        <Tooltip
                            title="Refresh history"
                        >

                            <span>

                                <IconButton
                                    onClick={() =>
                                        loadHistory(true)
                                    }
                                    disabled={
                                        refreshing
                                    }
                                    color="primary"
                                >

                                    {refreshing ? (

                                        <CircularProgress
                                            size={20}
                                        />

                                    ) : (

                                        <Refresh />

                                    )}

                                </IconButton>

                            </span>

                        </Tooltip>

                    </Stack>

                </CardContent>

            </Card>


            {/* ====================================================
                SUMMARY CARDS
            ==================================================== */}

            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(3, 1fr)",
                    },

                    gap: 2,

                    mb: 3,
                }}
            >

                {/* TOTAL */}

                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Total Records
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                mt: 0.5,
                            }}
                        >
                            {
                                incidents.length
                            }
                        </Typography>

                    </CardContent>

                </Card>


                {/* HIGH + CRITICAL */}

                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Critical / High
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                mt: 0.5,
                            }}
                        >
                            {
                                incidents.filter(
                                    incident =>
                                        incident.severity ===
                                            "Critical" ||
                                        incident.severity ===
                                            "High"
                                ).length
                            }
                        </Typography>

                    </CardContent>

                </Card>


                {/* SHOWING */}

                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Showing
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                mt: 0.5,
                            }}
                        >
                            {
                                filteredIncidents.length
                            }
                        </Typography>

                    </CardContent>

                </Card>

            </Box>


            {/* ====================================================
                HISTORY LIST
            ==================================================== */}

            <Card
                elevation={0}
                sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    overflow: "hidden",
                }}
            >

                <Box
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
                        }}
                    >
                        Security Event Timeline
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Historical incidents ordered
                        from newest to oldest.
                    </Typography>

                </Box>

                <Divider />


                {/* EMPTY */}

                {filteredIncidents.length === 0 ? (

                    <Box
                        sx={{
                            p: 6,
                            textAlign: "center",
                        }}
                    >

                        <HistoryIcon
                            sx={{
                                fontSize: 48,
                                color: "text.disabled",
                                mb: 1,
                            }}
                        />

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            No incidents found
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                mt: 0.5,
                            }}
                        >
                            Try changing your search
                            or severity filter.
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

                                        transition:
                                            "background-color 0.2s",

                                        "&:hover": {
                                            backgroundColor:
                                                "action.hover",
                                        },
                                    }}
                                >

                                    <Box
                                        sx={{
                                            display:
                                                "flex",
                                            gap: 2,
                                            alignItems:
                                                "flex-start",
                                        }}
                                    >

                                        {/* TIMELINE ICON */}

                                        <Box
                                            sx={{
                                                width: 42,
                                                height: 42,
                                                minWidth: 42,
                                                borderRadius:
                                                    "50%",
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",
                                                backgroundColor:
                                                    "action.selected",
                                            }}
                                        >

                                            <AccessTime
                                                color="primary"
                                                fontSize="small"
                                            />

                                        </Box>


                                        {/* CONTENT */}

                                        <Box
                                            sx={{
                                                flex: 1,
                                                minWidth: 0,
                                            }}
                                        >

                                            <Stack
                                                direction={{
                                                    xs: "column",
                                                    sm: "row",
                                                }}
                                                spacing={1}
                                                sx={{
                                                    alignItems: {
                                                        xs:
                                                            "flex-start",
                                                        sm:
                                                            "center",
                                                    },
                                                }}
                                            >

                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight: 700,
                                                        wordBreak:
                                                            "break-word",
                                                    }}
                                                >
                                                    {
                                                        incident.filename
                                                    }
                                                </Typography>


                                                <Chip
                                                    label={
                                                        incident.severity
                                                    }
                                                    color={
                                                        getSeverityColor(
                                                            incident.severity
                                                        )
                                                    }
                                                    size="small"
                                                    sx={{
                                                        fontWeight:
                                                            600,
                                                    }}
                                                />

                                            </Stack>


                                            {/* DATE */}

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    display:
                                                        "block",
                                                    mt: 0.5,
                                                }}
                                            >
                                                {new Date(
                                                    incident.created_at
                                                ).toLocaleString()}
                                            </Typography>


                                            {/* SUMMARY */}

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


                                            {/* ACTIONS */}

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{
                                                    mt: 2,
                                                }}
                                            >

                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    endIcon={
                                                        <ArrowForward />
                                                    }
                                                    onClick={() =>
                                                        navigate(
                                                            `/incidents/${incident.id}`
                                                        )
                                                    }
                                                >
                                                    View Incident
                                                </Button>


                                                <Tooltip
                                                    title={
                                                        "Delete incident"
                                                    }
                                                >

                                                    <span>

                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            disabled={
                                                                deletingId ===
                                                                incident.id
                                                            }
                                                            onClick={() =>
                                                                handleDelete(
                                                                    incident.id
                                                                )
                                                            }
                                                        >

                                                            {deletingId ===
                                                            incident.id ? (

                                                                <CircularProgress
                                                                    size={
                                                                        18
                                                                    }
                                                                />

                                                            ) : (

                                                                <Delete
                                                                    fontSize="small"
                                                                />

                                                            )}

                                                        </IconButton>

                                                    </span>

                                                </Tooltip>

                                            </Stack>

                                        </Box>

                                    </Box>

                                </Box>

                            )
                        )}

                    </Stack>

                )}

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
                SentinelAI SOC • Incident History
            </Typography>

        </Box>
    );
}


export default History;