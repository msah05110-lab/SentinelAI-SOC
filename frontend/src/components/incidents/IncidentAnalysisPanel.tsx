import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import {
  Language,
  Link as LinkIcon,
  Email,
  Fingerprint,
  Security,
  CheckCircle,
} from "@mui/icons-material";

import {
  IncidentIOC,
  MITRETechnique,
  ThreatIntel,
} from "../../types/incident";

interface Props {
  iocs: IncidentIOC;
  threats: ThreatIntel[];
  mitre: MITRETechnique[];
  recommendations: string[];
}

function IOCSection({
  title,
  values,
  icon,
}: {
  title: string;
  values: string[];
  icon: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mb: 1.5,
          alignItems: "center",
        }}
      >
        {icon}

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700 }}
        >
          {title}
        </Typography>

        <Chip
          label={values.length}
          size="small"
        />
      </Stack>

      {values.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
        >
          No {title.toLowerCase()} detected.
        </Typography>
      ) : (
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{
            flexWrap: "wrap",
          }}
        >
          {values.map((value, index) => (
            <Chip
              key={`${value}-${index}`}
              label={value}
              variant="outlined"
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

function IncidentAnalysisPanel({
  iocs,
  threats,
  mitre,
  recommendations,
}: Props) {
  return (
    <Stack spacing={3} sx={{ mt: 3 }}>

      {/* ================================================= */}
      {/* IOC ANALYSIS */}
      {/* ================================================= */}

      <Card>
        <CardContent>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            IOC Detection
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Indicators of Compromise extracted from
            the security log.
          </Typography>

          <IOCSection
            title="IP Addresses"
            values={iocs?.ips ?? []}
            icon={<Language />}
          />

          <Divider sx={{ mb: 3 }} />

          <IOCSection
            title="Domains"
            values={iocs?.domains ?? []}
            icon={<Language />}
          />

          <Divider sx={{ mb: 3 }} />

          <IOCSection
            title="URLs"
            values={iocs?.urls ?? []}
            icon={<LinkIcon />}
          />

          <Divider sx={{ mb: 3 }} />

          <IOCSection
            title="Email Addresses"
            values={iocs?.emails ?? []}
            icon={<Email />}
          />

          <Divider sx={{ mb: 3 }} />

          <IOCSection
            title="MD5 Hashes"
            values={iocs?.md5 ?? []}
            icon={<Fingerprint />}
          />

          <Divider sx={{ mb: 3 }} />

          <IOCSection
            title="SHA1 Hashes"
            values={iocs?.sha1 ?? []}
            icon={<Fingerprint />}
          />

          <Divider sx={{ mb: 3 }} />

          <IOCSection
            title="SHA256 Hashes"
            values={iocs?.sha256 ?? []}
            icon={<Fingerprint />}
          />

        </CardContent>
      </Card>


      {/* ================================================= */}
      {/* THREAT INTELLIGENCE */}
      {/* ================================================= */}

      <Card>
        <CardContent>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            Threat Intelligence
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Threat intelligence results associated
            with extracted indicators.
          </Typography>

          {threats.length === 0 ? (
            <Typography
              color="text.secondary"
            >
              No threat intelligence results available.
            </Typography>
          ) : (
            <Grid container spacing={2}>

              {threats.map(
                (threat, index) => (

                  <Grid
                    key={index}
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <Card
                      variant="outlined"
                    >
                      <CardContent>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            mb: 2,
                            alignItems: "center",
                          }}
                        >
                          <Security />

                          <Typography
                            sx={{
                              fontWeight: 700,
                            }}
                          >
                            {threat.provider ??
                              "Threat Intelligence"}
                          </Typography>
                        </Stack>

                        {threat.indicator && (
                          <Typography
                            variant="body2"
                            sx={{
                              wordBreak:
                                "break-all",
                              mb: 1,
                            }}
                          >
                            <strong>
                              Indicator:
                            </strong>{" "}
                            {threat.indicator}
                          </Typography>
                        )}

                        {threat.status && (
                          <Chip
                            label={threat.status}
                            size="small"
                            color={
                              threat.status
                                .toLowerCase()
                                .includes(
                                  "malicious"
                                )
                                ? "error"
                                : "default"
                            }
                          />
                        )}

                      </CardContent>
                    </Card>
                  </Grid>

                )
              )}

            </Grid>
          )}

        </CardContent>
      </Card>


      {/* ================================================= */}
      {/* MITRE ATT&CK */}
      {/* ================================================= */}

      <Card>
        <CardContent>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            MITRE ATT&CK Mapping
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Techniques identified from the security
            log.
          </Typography>

          {mitre.length === 0 ? (
            <Typography
              color="text.secondary"
            >
              No MITRE ATT&CK techniques detected.
            </Typography>
          ) : (
            <Grid container spacing={2}>

              {mitre.map(
                (technique) => (

                  <Grid
                    key={technique.id}
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <Card
                      variant="outlined"
                    >
                      <CardContent>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mb: 1 }}
                        >
                          <Chip
                            label={technique.id}
                            color="primary"
                            size="small"
                          />

                          <Chip
                            label={technique.tactic}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>

                        <Typography
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          {technique.name}
                        </Typography>

                      </CardContent>
                    </Card>
                  </Grid>

                )
              )}

            </Grid>
          )}

        </CardContent>
      </Card>


      {/* ================================================= */}
      {/* RECOMMENDATIONS */}
      {/* ================================================= */}

      <Card>
        <CardContent>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            Security Recommendations
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Recommended actions for incident
            response and investigation.
          </Typography>

          {recommendations.length === 0 ? (
            <Typography
              color="text.secondary"
            >
              No recommendations available.
            </Typography>
          ) : (
            <List>

              {recommendations.map(
                (recommendation, index) => (

                  <ListItem
                    key={index}
                  >
                    <ListItemIcon>
                      <CheckCircle
                        color="success"
                      />
                    </ListItemIcon>

                    <ListItemText
                      primary={recommendation}
                    />
                  </ListItem>

                )
              )}

            </List>
          )}

        </CardContent>
      </Card>

    </Stack>
  );
}

export default IncidentAnalysisPanel;