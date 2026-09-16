import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
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
    Analytics as AnalyticsIcon,
    Assessment,
    Security,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import SeverityPieChart from "../../components/charts/SeverityPieChart";
import IncidentBarChart from "../../components/charts/IncidentBarChart";

import {
    getAnalyticsSummary,
    getAnalyticsRecent,
    getSeverityDistribution,
} from "../../services/analyticsService";

import type {
    AnalyticsSummary,
    AnalyticsTrendItem,
    SeverityDistribution,
} from "../../services/analyticsService";


function Analytics() {

    const navigate = useNavigate();

    const [summary, setSummary] =
        useState<AnalyticsSummary | null>(null);

    const [recent, setRecent] =
        useState<AnalyticsTrendItem[]>([]);

    const [distribution, setDistribution] =
        useState<SeverityDistribution | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ============================================================
    // LOAD ANALYTICS
    // ============================================================

    useEffect(() => {

        async function loadAnalytics() {

            try {

                setLoading(true);
                setError("");

                const [
                    summaryData,
                    recentData,
                    distributionData,
                ] = await Promise.all([
                    getAnalyticsSummary(),
                    getAnalyticsRecent(),
                    getSeverityDistribution(),
                ]);

                setSummary(summaryData);
                setRecent(recentData);
                setDistribution(distributionData);

            } catch (err) {

                console.error(
                    "Failed to load analytics:",
                    err
                );

                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load analytics."
                );

            } finally {

                setLoading(false);

            }
        }

        loadAnalytics();

    }, []);


    // ============================================================
    // TREND DATA
    // ============================================================

    const trendData = useMemo(() => {

        const dayCounts: Record<
            string,
            number
        > = {
            Mon: 0,
            Tue: 0,
            Wed: 0,
            Thu: 0,
            Fri: 0,
            Sat: 0,
            Sun: 0,
        };

        recent.forEach((incident) => {

            const date =
                new Date(
                    incident.created_at
                );

            if (
                !Number.isNaN(
                    date.getTime()
                )
            ) {

                const day =
                    date.toLocaleDateString(
                        "en-US",
                        {
                            weekday: "short",
                        }
                    );

                if (
                    dayCounts[day] !==
                    undefined
                ) {
                    dayCounts[day] += 1;
                }

            }
        });

        return Object.entries(
            dayCounts
        ).map(
            ([day, count]) => ({
                day,
                count,
            })
        );

    }, [recent]);


    // ============================================================
    // SEVERITY DATA
    // ============================================================

    const severityData =
        distribution
            ? [
                {
                    name: "Critical",
                    value:
                        distribution.critical,
                },
                {
                    name: "High",
                    value:
                        distribution.high,
                },
                {
                    name: "Medium",
                    value:
                        distribution.medium,
                },
                {
                    name: "Low",
                    value:
                        distribution.low,
                },
            ]
            : [];


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
                    Loading security analytics...
                </Typography>

            </Box>
        );
    }


    // ============================================================
    // ERROR
    // ============================================================

    if (error) {

        return (
            <Box sx={{ p: 4 }}>

                <Alert severity="error">
                    {error}
                </Alert>

            </Box>
        );
    }


    if (
        !summary ||
        !distribution
    ) {

        return (
            <Box sx={{ p: 4 }}>

                <Alert severity="warning">
                    Analytics data is unavailable.
                </Alert>

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

                        <AnalyticsIcon
                            color="primary"
                        />

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            Security Analytics
                        </Typography>

                    </Stack>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                    >
                        SentinelAI SOC incident
                        statistics and threat analytics.
                    </Typography>

                </Box>


                <Chip
                    icon={<Security />}
                    label={
                        `${summary.total} Total Incidents`
                    }
                    color="primary"
                    variant="outlined"
                    sx={{
                        fontWeight: 700,
                    }}
                />

            </Box>


            {/* ====================================================
                KPI CARDS
            ==================================================== */}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(5, 1fr)",
                    },
                    gap: 2,
                    mb: 3,
                }}
            >

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
                        >
                            Total Incidents
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mt: 1,
                            }}
                        >
                            {summary.total}
                        </Typography>

                    </CardContent>
                </Card>


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
                        >
                            Critical
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mt: 1,
                                color: "error.main",
                            }}
                        >
                            {summary.critical}
                        </Typography>

                    </CardContent>
                </Card>


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
                        >
                            High
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mt: 1,
                                color: "warning.main",
                            }}
                        >
                            {summary.high}
                        </Typography>

                    </CardContent>
                </Card>


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
                        >
                            Medium
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mt: 1,
                                color: "info.main",
                            }}
                        >
                            {summary.medium}
                        </Typography>

                    </CardContent>
                </Card>


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
                        >
                            Low
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mt: 1,
                                color: "success.main",
                            }}
                        >
                            {summary.low}
                        </Typography>

                    </CardContent>
                </Card>

            </Box>


            {/* ====================================================
                CHARTS
            ==================================================== */}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1fr 1.4fr",
                    },
                    gap: 3,
                    mb: 3,
                }}
            >

                {/* SEVERITY */}

                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                    }}
                >

                    <Stack
                        direction="row"
                        sx={{
                            justifyContent:
                                "space-between",
                            alignItems:
                                "center",
                            mb: 2,
                        }}
                    >

                        <Box>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Severity Distribution
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Current incident
                                severity breakdown.
                            </Typography>

                        </Box>

                        <Chip
                            label={
                                `${summary.total} Total`
                            }
                            size="small"
                            variant="outlined"
                        />

                    </Stack>

                    <SeverityPieChart
                        data={severityData}
                    />

                </Paper>


                {/* INCIDENT TREND */}

                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                    }}
                >

                    <Box sx={{ mb: 2 }}>

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            Recent Incident Activity
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Incident activity across
                            recent records.
                        </Typography>

                    </Box>

                    <IncidentBarChart
                        data={trendData}
                    />

                </Paper>

            </Box>


            {/* ====================================================
                RECENT INCIDENTS
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

                <CardContent>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        sx={{
                            justifyContent:
                                "space-between",
                            alignItems: {
                                xs: "flex-start",
                                sm: "center",
                            },
                            gap: 2,
                        }}
                    >

                        <Box>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Recent Incidents
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Latest incidents returned
                                by the analytics service.
                            </Typography>

                        </Box>

                        <Chip
                            label={
                                `${recent.length} Recent`
                            }
                            size="small"
                            color="primary"
                            variant="outlined"
                        />

                    </Stack>

                </CardContent>


                <Divider />


                {recent.length === 0 ? (

                    <Box
                        sx={{
                            p: 5,
                            textAlign: "center",
                        }}
                    >

                        <Assessment
                            sx={{
                                fontSize: 48,
                                color:
                                    "text.disabled",
                            }}
                        />

                        <Typography
                            variant="h6"
                            sx={{
                                mt: 1,
                                fontWeight: 600,
                            }}
                        >
                            No recent incidents
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            No recent incident data
                            is available.
                        </Typography>

                    </Box>

                ) : (

                    <Stack>

                        {recent.map(
                            (
                                incident,
                                index
                            ) => (

                                <Box
                                    key={
                                        incident.id
                                    }
                                    sx={{
                                        p: 2.5,

                                        borderBottom:
                                            index !==
                                            recent.length - 1
                                                ? "1px solid"
                                                : "none",

                                        borderColor:
                                            "divider",

                                        cursor:
                                            "pointer",

                                        "&:hover": {
                                            backgroundColor:
                                                "action.hover",
                                        },
                                    }}
                                    onClick={() =>
                                        navigate(
                                            `/incidents/${incident.id}`
                                        )
                                    }
                                >

                                    <Stack
                                        direction={{
                                            xs: "column",
                                            sm: "row",
                                        }}
                                        sx={{
                                            justifyContent:
                                                "space-between",
                                            alignItems: {
                                                xs:
                                                    "flex-start",
                                                sm:
                                                    "center",
                                            },
                                            gap: 2,
                                        }}
                                    >

                                        <Box>

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

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {new Date(
                                                    incident.created_at
                                                ).toLocaleString()}
                                            </Typography>

                                        </Box>


                                        <Chip
                                            label={
                                                incident.severity
                                            }
                                            size="small"
                                            color={
                                                incident.severity ===
                                                "Critical"
                                                    ? "error"
                                                    : incident.severity ===
                                                      "High"
                                                    ? "warning"
                                                    : incident.severity ===
                                                      "Medium"
                                                    ? "info"
                                                    : "success"
                                            }
                                        />

                                    </Stack>

                                </Box>

                            )
                        )}

                    </Stack>

                )}

            </Card>


            {/* ====================================================
                FOOTER
            ==================================================== */}

            <Divider
                sx={{
                    mt: 4,
                }}
            />

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    textAlign: "center",
                    py: 3,
                }}
            >
                SentinelAI SOC • Security Analytics
            </Typography>

        </Box>
    );
}


export default Analytics;