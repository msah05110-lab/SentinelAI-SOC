import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  TextField,
} from "@mui/material";

import IncidentTable from "../../components/incidents/IncidentTable";
import { getIncidents } from "../../services/incidentService";
import { Incident } from "../../types/incident";

function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchIncidents() {
      try {
        const data = await getIncidents();
        setIncidents(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load incidents.");
      } finally {
        setLoading(false);
      }
    }

    fetchIncidents();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Incident Management
      </Typography>

      <TextField
        label="Search Incident"
        fullWidth
        margin="normal"
      />

      {loading && (
        <Box mt={3}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Box mt={3}>
          <IncidentTable incidents={incidents} />
        </Box>
      )}
    </Box>
  );
}

export default Incidents;