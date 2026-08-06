import { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";

import DashboardCard from "../../components/dashboard/DashboardCard";
import RecentIncidents from "../../components/dashboard/RecentIncidents";
import SeverityPieChart from "../../components/charts/SeverityPieChart";
import IncidentBarChart from "../../components/charts/IncidentBarChart";

import { getDashboard } from "../../services/dashboardService";
import { DashboardResponse } from "../../types/dashboard";

function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!data) {
    return <Typography>Failed to load dashboard.</Typography>;
  }

  // Demo Chart Data
  const severityData = [
    { name: "Critical", value: data.critical },
    { name: "High", value: data.high },
    { name: "Medium", value: data.medium },
    { name: "Low", value: data.low },
  ];

  const trendData = [
    { day: "Mon", count: 3 },
    { day: "Tue", count: 5 },
    { day: "Wed", count: 2 },
    { day: "Thu", count: 6 },
    { day: "Fri", count: 4 },
    { day: "Sat", count: 7 },
    { day: "Sun", count: 1 },
  ];

  return (
    <Grid container spacing={3}>

      {/* Dashboard Cards */}

      <Grid item xs={12} md={3}>
        <DashboardCard
          title="Total Incidents"
          value={data.total_incidents}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <DashboardCard
          title="Critical"
          value={data.critical}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <DashboardCard
          title="High"
          value={data.high}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <DashboardCard
          title="Medium"
          value={data.medium}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <DashboardCard
          title="Low"
          value={data.low}
        />
      </Grid>

      {/* Pie Chart */}

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Incident Severity
          </Typography>

          <SeverityPieChart data={severityData} />
        </Paper>
      </Grid>

      {/* Bar Chart */}

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Weekly Incident Trend
          </Typography>

          <IncidentBarChart data={trendData} />
        </Paper>
      </Grid>

      {/* Recent Incidents */}

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Incidents
          </Typography>

          <RecentIncidents />
        </Paper>
      </Grid>

    </Grid>
  );
}

export default Dashboard;