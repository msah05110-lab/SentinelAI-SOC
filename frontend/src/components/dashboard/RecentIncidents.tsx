import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { Incident } from "../../types/incident";

interface Props {
  incidents: Incident[];
}

function RecentIncidents({ incidents }: Props) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700 }}
              >
                Filename
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700 }}
              >
                Severity
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700 }}
              >
                AI Summary
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700 }}
              >
                Date
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {incidents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography
                  variant="body2"
                  sx={{ py: 3, color: "text.secondary" }}
                >
                  No incidents found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            incidents.map((incident) => (
              <TableRow key={incident.id} hover>
                <TableCell>
                  <Typography variant="body2">
                    {incident.filename}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={incident.severity}
                    size="small"
                    color={
                      incident.severity === "Critical"
                        ? "error"
                        : incident.severity === "High"
                        ? "warning"
                        : incident.severity === "Medium"
                        ? "info"
                        : "success"
                    }
                  />
                </TableCell>

                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      maxWidth: 400,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {incident.ai_summary ||
                      "No AI summary available"}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2">
                    {new Date(
                      incident.created_at
                    ).toLocaleString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecentIncidents;