import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Typography,
  TableContainer,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import type { Incident } from "../../types/incident";

interface Props {
  incidents: Incident[];
  onDelete?: (id: number) => void;
}

function IncidentTable({ incidents, onDelete }: Props) {
  const navigate = useNavigate();

  const getSeverityColor = (
    severity: string
  ): "error" | "warning" | "info" | "success" => {
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
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>
        {/* TABLE HEADER */}
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "background.default",
            }}
          >
            <TableCell>
              <Typography
                sx={{
                  fontWeight: 700,
                }}
              >
                Filename
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                sx={{
                  fontWeight: 700,
                }}
              >
                Severity
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                sx={{
                  fontWeight: 700,
                }}
              >
                AI Summary
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                sx={{
                  fontWeight: 700,
                }}
              >
                Date
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography
                sx={{
                  fontWeight: 700,
                }}
              >
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* TABLE BODY */}
        <TableBody>
          {incidents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography
                  color="text.secondary"
                  sx={{
                    py: 3,
                  }}
                >
                  No incidents found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            incidents.map((incident) => (
              <TableRow
                key={incident.id}
                hover
                sx={{
                  cursor: "pointer",

                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
                onClick={() =>
                  navigate(
                    `/incidents/${incident.id}`
                  )
                }
              >
                {/* FILENAME */}
                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {incident.filename}
                  </Typography>
                </TableCell>

                {/* SEVERITY */}
                <TableCell>
                  <Chip
                    label={incident.severity}
                    size="small"
                    color={getSeverityColor(
                      incident.severity
                    )}
                  />
                </TableCell>

                {/* AI SUMMARY */}
                <TableCell>
                  <Typography
                    color="text.secondary"
                    sx={{
                      maxWidth: 450,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {incident.ai_summary ||
                      "No AI summary available"}
                  </Typography>
                </TableCell>

                {/* DATE */}
                <TableCell>
                  <Typography
                    color="text.secondary"
                  >
                    {new Date(
                      incident.created_at
                    ).toLocaleString()}
                  </Typography>
                </TableCell>

                {/* DELETE ACTION */}
                <TableCell align="center">
                  <Tooltip title="Delete incident">
                    <IconButton
                      color="error"
                      onClick={(event) => {
                        event.stopPropagation();

                        if (onDelete) {
                          onDelete(incident.id);
                        }
                      }}
                    >
                      <span
                        style={{
                          fontSize: "20px",
                          lineHeight: 1,
                        }}
                      >
                        🗑
                      </span>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default IncidentTable;