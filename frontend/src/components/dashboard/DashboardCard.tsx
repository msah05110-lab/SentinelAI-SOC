import {
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  value: string | number;
}

function DashboardCard({ title, value }: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(145deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95))",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: "primary.main",
          boxShadow: "0 8px 25px rgba(0,188,212,0.12)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.3px",
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "primary.main",
              boxShadow: "0 0 10px rgba(0,188,212,0.7)",
            }}
          />
        </Box>

        <Typography
          variant="h4"
          sx={{
            mt: 1,
            fontWeight: 800,
            letterSpacing: "-1px",
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;