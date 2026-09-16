import { useState } from "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    register,
} from "../../services/authService";


function Register() {

    const navigate = useNavigate();

    const [fullName, setFullName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // ============================================================
    // REGISTER
    // ============================================================

    async function handleRegister() {

        if (
            !fullName.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {

            setError(
                "Please fill in all fields."
            );

            return;
        }


        if (password.length < 8) {

            setError(
                "Password must contain at least 8 characters."
            );

            return;
        }


        if (
            password !==
            confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        try {

            setLoading(true);
            setError("");
            setSuccess("");


            await register({
                full_name:
                    fullName.trim(),

                email:
                    email.trim(),

                password,
            });


            setSuccess(
                "Registration successful. Redirecting to login..."
            );


            setTimeout(() => {

                navigate(
                    "/",
                    {
                        replace: true,
                    }
                );

            }, 1200);

        } catch (err: any) {

            console.error(
                "Registration failed:",
                err
            );


            const detail =
                err?.response?.data?.detail;


            if (
                typeof detail ===
                "string"
            ) {

                setError(detail);

            } else {

                setError(
                    "Registration failed. Please try again."
                );

            }

        } finally {

            setLoading(false);

        }
    }


    return (

        <div
            style={{
                minHeight: "100vh",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                background:
                    "#0f172a",

                padding: "20px",

                boxSizing:
                    "border-box",
            }}
        >

            <div
                style={{
                    width: "100%",

                    maxWidth: "440px",

                    background:
                        "#ffffff",

                    borderRadius: "14px",

                    padding: "35px",

                    boxSizing:
                        "border-box",

                    boxShadow:
                        "0 20px 50px rgba(0,0,0,0.25)",
                }}
            >

                {/* ==================================================
                    HEADER
                ================================================== */}

                <h1
                    style={{
                        textAlign:
                            "center",

                        margin:
                            "0 0 10px 0",

                        color:
                            "#0f172a",
                    }}
                >
                    SentinelAI SOC
                </h1>


                <p
                    style={{
                        textAlign:
                            "center",

                        color:
                            "#64748b",

                        marginBottom:
                            "30px",
                    }}
                >
                    Create your SOC Analyst account
                </p>


                {/* ==================================================
                    ERROR
                ================================================== */}

                {error && (

                    <div
                        style={{
                            background:
                                "#fee2e2",

                            color:
                                "#991b1b",

                            padding:
                                "12px",

                            borderRadius:
                                "8px",

                            marginBottom:
                                "20px",

                            fontSize:
                                "14px",
                        }}
                    >
                        {error}
                    </div>

                )}


                {/* ==================================================
                    SUCCESS
                ================================================== */}

                {success && (

                    <div
                        style={{
                            background:
                                "#dcfce7",

                            color:
                                "#166534",

                            padding:
                                "12px",

                            borderRadius:
                                "8px",

                            marginBottom:
                                "20px",

                            fontSize:
                                "14px",
                        }}
                    >
                        {success}
                    </div>

                )}


                {/* ==================================================
                    FULL NAME
                ================================================== */}

                <label
                    style={{
                        display:
                            "block",

                        marginBottom:
                            "7px",

                        fontWeight:
                            600,
                    }}
                >
                    Full Name
                </label>


                <input
                    type="text"

                    value={
                        fullName
                    }

                    onChange={(e) =>
                        setFullName(
                            e.target.value
                        )
                    }

                    placeholder="Enter your full name"

                    style={{
                        width:
                            "100%",

                        padding:
                            "13px",

                        border:
                            "1px solid #cbd5e1",

                        borderRadius:
                            "8px",

                        fontSize:
                            "15px",

                        marginBottom:
                            "18px",

                        boxSizing:
                            "border-box",
                    }}
                />


                {/* ==================================================
                    EMAIL
                ================================================== */}

                <label
                    style={{
                        display:
                            "block",

                        marginBottom:
                            "7px",

                        fontWeight:
                            600,
                    }}
                >
                    Email
                </label>


                <input
                    type="email"

                    value={
                        email
                    }

                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }

                    placeholder="Enter your email"

                    style={{
                        width:
                            "100%",

                        padding:
                            "13px",

                        border:
                            "1px solid #cbd5e1",

                        borderRadius:
                            "8px",

                        fontSize:
                            "15px",

                        marginBottom:
                            "18px",

                        boxSizing:
                            "border-box",
                    }}
                />


                {/* ==================================================
                    PASSWORD
                ================================================== */}

                <label
                    style={{
                        display:
                            "block",

                        marginBottom:
                            "7px",

                        fontWeight:
                            600,
                    }}
                >
                    Password
                </label>


                <input
                    type="password"

                    value={
                        password
                    }

                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }

                    placeholder="Enter password"

                    style={{
                        width:
                            "100%",

                        padding:
                            "13px",

                        border:
                            "1px solid #cbd5e1",

                        borderRadius:
                            "8px",

                        fontSize:
                            "15px",

                        marginBottom:
                            "18px",

                        boxSizing:
                            "border-box",
                    }}
                />


                {/* ==================================================
                    CONFIRM PASSWORD
                ================================================== */}

                <label
                    style={{
                        display:
                            "block",

                        marginBottom:
                            "7px",

                        fontWeight:
                            600,
                    }}
                >
                    Confirm Password
                </label>


                <input
                    type="password"

                    value={
                        confirmPassword
                    }

                    onChange={(e) =>
                        setConfirmPassword(
                            e.target.value
                        )
                    }

                    placeholder="Confirm password"

                    onKeyDown={(e) => {

                        if (
                            e.key ===
                            "Enter"
                        ) {

                            handleRegister();

                        }

                    }}

                    style={{
                        width:
                            "100%",

                        padding:
                            "13px",

                        border:
                            "1px solid #cbd5e1",

                        borderRadius:
                            "8px",

                        fontSize:
                            "15px",

                        marginBottom:
                            "22px",

                        boxSizing:
                            "border-box",
                    }}
                />


                {/* ==================================================
                    REGISTER BUTTON
                ================================================== */}

                <button
                    onClick={
                        handleRegister
                    }

                    disabled={
                        loading
                    }

                    style={{
                        width:
                            "100%",

                        padding:
                            "13px",

                        border:
                            "none",

                        borderRadius:
                            "8px",

                        background:
                            loading
                                ? "#64748b"
                                : "#2563eb",

                        color:
                            "#ffffff",

                        fontSize:
                            "16px",

                        fontWeight:
                            600,

                        cursor:
                            loading
                                ? "not-allowed"
                                : "pointer",
                    }}
                >
                    {loading
                        ? "Creating account..."
                        : "Create Account"}
                </button>


                {/* ==================================================
                    LOGIN LINK
                ================================================== */}

                <p
                    style={{
                        textAlign:
                            "center",

                        marginTop:
                            "20px",

                        color:
                            "#64748b",
                    }}
                >
                    Already have an account?{" "}

                    <Link
                        to="/"
                        style={{
                            color:
                                "#2563eb",

                            fontWeight:
                                600,

                            textDecoration:
                                "none",
                        }}
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}


export default Register;