import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    Login as LoginIcon,
    Security,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import {
    login,
} from "../../services/authService";

import {
    saveToken,
} from "../../utils/auth";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // ============================================================
    // LOGIN
    // ============================================================

    async function handleLogin() {

        setError("");

        if (
            !email.trim() ||
            !password
        ) {
            setError(
                "Please enter email and password."
            );

            return;
        }

        try {

            setLoading(true);

            const response =
                await login(
                    email.trim(),
                    password
                );

            saveToken(
                response.access_token
            );

            navigate(
                "/dashboard",
                {
                    replace: true,
                }
            );

        } catch (err: any) {

            console.error(
                "Login failed:",
                err
            );

            const backendDetail =
                err?.response?.data?.detail;

            setError(
                typeof backendDetail ===
                    "string"
                    ? backendDetail
                    : "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }
    }


    // ============================================================
    // PAGE
    // ============================================================

    return (

        <Box
            sx={{
                minHeight: "100vh",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                backgroundColor:
                    "#0f172a",

                p: 2,
            }}
        >

            <Card
                elevation={8}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    borderRadius: 3,
                }}
            >

                <CardContent
                    sx={{
                        p: {
                            xs: 3,
                            sm: 4,
                        },
                    }}
                >

                    {/* ==================================================
                        HEADER
                    ================================================== */}

                    <Box
                        sx={{
                            textAlign: "center",
                            mb: 3,
                        }}
                    >

                        <Security
                            color="primary"
                            sx={{
                                fontSize: 42,
                                mb: 1,
                            }}
                        />

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            SentinelAI SOC
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 0.5,
                            }}
                        >
                            AI Powered Security Operations Center
                        </Typography>

                    </Box>


                    {/* ==================================================
                        ERROR
                    ================================================== */}

                    {error && (

                        <Alert
                            severity="error"
                            sx={{
                                mb: 2,
                            }}
                        >
                            {error}
                        </Alert>

                    )}


                    {/* ==================================================
                        LOGIN FORM
                    ================================================== */}

                    <Stack spacing={2}>

                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            disabled={loading}
                            autoComplete="email"
                        />


                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            onKeyDown={(event) => {

                                if (
                                    event.key ===
                                    "Enter"
                                ) {
                                    handleLogin();
                                }

                            }}
                            disabled={loading}
                            autoComplete="current-password"
                        />


                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            startIcon={
                                loading ? (
                                    <CircularProgress
                                        size={18}
                                        color="inherit"
                                    />
                                ) : (
                                    <LoginIcon />
                                )
                            }
                            disabled={loading}
                            onClick={
                                handleLogin
                            }
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </Button>

                    </Stack>


                    {/* ==================================================
                        REGISTER
                    ================================================== */}

                    <Box
                        sx={{
                            mt: 3,
                            pt: 2.5,
                            borderTop: "1px solid",
                            borderColor: "divider",
                            textAlign: "center",
                        }}
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Don't have an account?
                        </Typography>


                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{
                                mt: 1,
                            }}
                            disabled={loading}
                            onClick={() =>
                                navigate(
                                    "/register"
                                )
                            }
                        >
                            Create Account
                        </Button>

                    </Box>

                </CardContent>

            </Card>

        </Box>
    );
}


export default Login;