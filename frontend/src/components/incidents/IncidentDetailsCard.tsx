import {
    Card,
    CardContent,
    Chip,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

interface Props {
    filename: string;
    severity: string;
    ai_summary: string | null;
    created_at: string;
}

function IncidentDetailsCard({
    filename,
    severity,
    ai_summary,
    created_at,
}: Props) {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <CardContent sx={{ p: 3 }}>

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                    }}
                >
                    Incident Details
                </Typography>

                <Stack spacing={3}>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0.5 }}
                        >
                            Filename
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                wordBreak: "break-word",
                            }}
                        >
                            {filename}
                        </Typography>
                    </Paper>


                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            Severity
                        </Typography>

                        <Chip
                            label={severity}
                            color={
                                severity === "Critical"
                                    ? "error"
                                    : severity === "High"
                                    ? "warning"
                                    : severity === "Medium"
                                    ? "info"
                                    : "success"
                            }
                            sx={{
                                fontWeight: 700,
                                width: "fit-content",
                            }}
                        />
                    </Paper>


                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            AI Summary
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                lineHeight: 1.8,
                            }}
                        >
                            {ai_summary ||
                                "No AI summary available."}
                        </Typography>
                    </Paper>


                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0.5 }}
                        >
                            Created At
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            {new Date(
                                created_at
                            ).toLocaleString()}
                        </Typography>
                    </Paper>

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    SentinelAI SOC • Incident Analysis
                </Typography>

            </CardContent>
        </Card>
    );
}

export default IncidentDetailsCard;