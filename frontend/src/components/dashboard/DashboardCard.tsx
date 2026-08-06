import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  title: string;
  value: string | number;
}

function DashboardCard({ title, value }: Props) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="subtitle2">
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{ mt: 2 }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;