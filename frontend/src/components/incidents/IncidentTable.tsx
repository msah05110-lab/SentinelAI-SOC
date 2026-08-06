import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

import { Incident } from "../../types/incident";

interface Props {
  incidents: Incident[];
}

function IncidentTable({ incidents }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Filename</TableCell>
          <TableCell>Severity</TableCell>
          <TableCell>AI Summary</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {incidents.map((incident) => (
          <TableRow key={incident.id}>
            <TableCell>{incident.filename}</TableCell>

            <TableCell>
              <Chip
                label={incident.severity}
                color={
                  incident.severity === "Critical"
                    ? "error"
                    : incident.severity === "High"
                    ? "warning"
                    : "success"
                }
              />
            </TableCell>

            <TableCell>{incident.ai_summary}</TableCell>

            <TableCell>{incident.created_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default IncidentTable;