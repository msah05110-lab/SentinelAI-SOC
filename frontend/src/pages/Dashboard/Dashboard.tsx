import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import DashboardCard from "../../components/dashboard/DashboardCard";
import RecentIncidents from "../../components/dashboard/RecentIncidents";
import SeverityPieChart from "../../components/charts/SeverityPieChart";
import IncidentBarChart from "../../components/charts/IncidentBarChart";

import { getDashboard } from "../../services/dashboardService";
import type { DashboardResponse } from "../../types/dashboard";

function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await getDashboard();
        setData(response);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

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
        <CircularProgress color="primary" />

        <Typography color="text.secondary">
          Loading SentinelAI SOC...
        </Typography>
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          {error || "Failed to load dashboard."}
        </Alert>
      </Box>
    );
  }

  const severityData = [
    {
      name: "Critical",
      value: data.critical,
    },
    {
      name: "High",
      value: data.high,
    },
    {
      name: "Medium",
      value: data.medium,
    },
    {
      name: "Low",
      value: data.low,
    },
  ];

  const trendMap: Record<string, number> = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  data.recent.forEach((incident) => {
    const date = new Date(incident.created_at);

    if (!Number.isNaN(date.getTime())) {
      const day = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      if (trendMap[day] !== undefined) {
        trendMap[day] += 1;
      }
    }
  });

  const trendData = Object.entries(trendMap).map(
    ([day, count]) => ({
      day,
      count,
    })
  );

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
      {/* HEADER */}

      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
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
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            Security Operations Center
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            SentinelAI threat monitoring and incident overview
          </Typography>
        </Box>

        <Chip
          label="SOC ONLINE"
          color="success"
          variant="outlined"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}
        />
      </Box>

      {/* KPI CARDS */}

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
        <DashboardCard
          title="Total Incidents"
          value={data.total_incidents}
        />

        <DashboardCard
          title="Critical"
          value={data.critical}
        />

        <DashboardCard
          title="High"
          value={data.high}
        />

        <DashboardCard
          title="Medium"
          value={data.medium}
        />

        <DashboardCard
          title="Low"
          value={data.low}
        />
      </Box>

      {/* ANALYTICS */}

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
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700 }}
              >
                Incident Severity
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Current threat distribution
              </Typography>
            </Box>

            <Chip
              label={`${data.total_incidents} Total`}
              size="small"
              variant="outlined"
            />
          </Stack>

          <SeverityPieChart data={severityData} />
        </Paper>

        {/* INCIDENT ACTIVITY */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700 }}
            >
              Incident Activity
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Activity based on recent incidents
            </Typography>
          </Box>

          <IncidentBarChart data={trendData} />
        </Paper>
      </Box>

      {/* RECENT INCIDENTS */}

      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 2,
            md: 3,
          },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          sx={{
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            mb: 2,
            gap: 1,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700 }}
            >
              Recent Incidents
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Latest security events analyzed by SentinelAI
            </Typography>
          </Box>

          <Chip
            label={`${data.recent.length} Recent`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Stack>

        <RecentIncidents incidents={data.recent} />
      </Paper>
    </Box>
  );
}

export default Dashboard;