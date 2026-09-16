import {
    useEffect,
    useState,
} from "react";

import {
    AppBar,
    Avatar,
    Box,
    Chip,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";

import {
    AccountCircle,
    Logout,
    Menu as MenuIcon,
} from "@mui/icons-material";

import {
    useNavigate,
} from "react-router-dom";

import {
    getCurrentUser,
} from "../../services/authService";

import {
    logout,
} from "../../utils/auth";


interface CurrentUser {
    id: string | number;
    full_name: string;
    email: string;
    is_active: boolean;
    role: string;
}


interface NavbarProps {
    onMenuClick: () => void;
}


function Navbar({
    onMenuClick,
}: NavbarProps) {

    const navigate =
        useNavigate();


    const [user, setUser] =
        useState<CurrentUser | null>(
            null
        );


    const [anchorEl, setAnchorEl] =
        useState<null | HTMLElement>(
            null
        );


    const menuOpen =
        Boolean(anchorEl);


    // ============================================================
    // LOAD CURRENT USER
    // ============================================================

    useEffect(() => {

        let mounted = true;


        async function loadUser() {

            try {

                const data =
                    await getCurrentUser();

                if (mounted) {

                    setUser(
                        data
                    );
                }

            } catch (error) {

                console.error(
                    "Failed to load current user:",
                    error
                );

                logout();

                navigate(
                    "/",
                    {
                        replace: true,
                    }
                );
            }
        }


        loadUser();


        return () => {
            mounted = false;
        };

    }, [navigate]);


    // ============================================================
    // MENU
    // ============================================================

    function handleMenuOpen(
        event: React.MouseEvent<HTMLElement>
    ) {

        setAnchorEl(
            event.currentTarget
        );
    }


    function handleMenuClose() {

        setAnchorEl(
            null
        );
    }


    // ============================================================
    // LOGOUT
    // ============================================================

    function handleLogout() {

        logout();

        handleMenuClose();

        navigate(
            "/",
            {
                replace: true,
            }
        );
    }


    // ============================================================
    // INITIAL
    // ============================================================

    const userInitial =
        user?.full_name
            ? user.full_name
                .charAt(0)
                .toUpperCase()
            : "U";


    return (

        <AppBar
            position="fixed"

            sx={{
                zIndex: (
                    theme
                ) =>
                    theme.zIndex.drawer + 1,
            }}
        >

            <Toolbar
                sx={{
                    display: "flex",

                    justifyContent:
                        "space-between",

                    minHeight: {
                        xs: 64,
                        sm: 64,
                    },
                }}
            >

                {/* ==================================================
                    LEFT SIDE
                ================================================== */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: 0,
                    }}
                >

                    {/* MOBILE MENU */}

                    <IconButton
                        color="inherit"
                        onClick={
                            onMenuClick
                        }
                        aria-label={
                            "Open navigation"
                        }

                        sx={{
                            display: {
                                xs: "inline-flex",
                                md: "none",
                            },

                            mr: 1,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>


                    {/* LOGO */}

                    <Box
                        sx={{
                            minWidth: 0,
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                letterSpacing:
                                    0.5,

                                whiteSpace:
                                    "nowrap",
                            }}
                        >
                            SentinelAI SOC
                        </Typography>


                        <Typography
                            variant="caption"
                            sx={{
                                opacity:
                                    0.75,

                                display: {
                                    xs: "none",
                                    sm: "block",
                                },
                            }}
                        >
                            AI Powered Security Operations Center
                        </Typography>

                    </Box>

                </Box>


                {/* ==================================================
                    RIGHT USER AREA
                ================================================== */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: {
                            xs: 0.5,
                            sm: 1.5,
                        },
                    }}
                >

                    {/* USER INFO */}

                    {user && (

                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "block",
                                },

                                textAlign:
                                    "right",
                            }}
                        >

                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                }}
                            >
                                {
                                    user.full_name
                                }
                            </Typography>

                            <Typography
                                variant="caption"
                                sx={{
                                    opacity:
                                        0.75,
                                }}
                            >
                                {
                                    user.role
                                }
                            </Typography>

                        </Box>
                    )}


                    {/* ROLE CHIP */}

                    {user && (

                        <Chip
                            label={
                                user.role
                            }

                            size="small"

                            sx={{
                                display: {
                                    xs: "none",
                                    md: "flex",
                                },

                                color:
                                    "white",

                                borderColor:
                                    "rgba(255,255,255,0.5)",
                            }}

                            variant="outlined"
                        />
                    )}


                    {/* AVATAR */}

                    <IconButton
                        color="inherit"
                        onClick={
                            handleMenuOpen
                        }

                        aria-controls={
                            menuOpen
                                ? "user-menu"
                                : undefined
                        }

                        aria-haspopup="true"

                        aria-expanded={
                            menuOpen
                                ? "true"
                                : undefined
                        }
                    >

                        {user ? (

                            <Avatar
                                sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor:
                                        "secondary.main",
                                }}
                            >
                                {
                                    userInitial
                                }
                            </Avatar>

                        ) : (

                            <AccountCircle />

                        )}

                    </IconButton>

                </Box>


                {/* ==================================================
                    USER MENU
                ================================================== */}

                <Menu
                    id="user-menu"

                    anchorEl={
                        anchorEl
                    }

                    open={
                        menuOpen
                    }

                    onClose={
                        handleMenuClose
                    }

                    anchorOrigin={{
                        vertical:
                            "bottom",
                        horizontal:
                            "right",
                    }}

                    transformOrigin={{
                        vertical:
                            "top",
                        horizontal:
                            "right",
                    }}
                >

                    {user && (

                        <Box
                            sx={{
                                px: 2,
                                py: 1.5,
                                minWidth: 220,
                            }}
                        >

                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                {
                                    user.full_name
                                }
                            </Typography>


                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {
                                    user.email
                                }
                            </Typography>


                            <Box
                                sx={{
                                    mt: 1,
                                }}
                            >

                                <Chip
                                    label={
                                        user.role
                                    }

                                    size="small"

                                    color="primary"
                                />

                            </Box>

                        </Box>

                    )}


                    <Divider />


                    <MenuItem
                        onClick={
                            handleLogout
                        }

                        sx={{
                            color:
                                "error.main",
                            gap: 1,
                        }}
                    >

                        <Logout
                            fontSize="small"
                        />

                        Logout

                    </MenuItem>

                </Menu>

            </Toolbar>

        </AppBar>
    );
}


export default Navbar;