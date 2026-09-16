import type { ReactNode } from "react";

import {
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";

import {
    Analytics as AnalyticsIcon,
    CloudUpload,
    Dashboard as DashboardIcon,
    Description,
    History as HistoryIcon,
    Security,
} from "@mui/icons-material";

import {
    NavLink,
} from "react-router-dom";


const drawerWidth = 240;


interface NavigationItem {
    label: string;
    path: string;
    icon: ReactNode;
    end?: boolean;
}


interface SidebarProps {
    mobileOpen: boolean;
    onMobileClose: () => void;
}


function Sidebar({
    mobileOpen,
    onMobileClose,
}: SidebarProps) {

    const navigationItems:
        NavigationItem[] = [

        {
            label: "Dashboard",
            path: "/dashboard",
            icon: <DashboardIcon />,
            end: true,
        },

        {
            label: "Analytics",
            path: "/analytics",
            icon: <AnalyticsIcon />,
            end: true,
        },

        {
            label: "Incidents",
            path: "/incidents",
            icon: <Security />,
            end: true,
        },

        {
            label: "Upload & Analyze",
            path: "/incidents/upload",
            icon: <CloudUpload />,
            end: true,
        },

        {
            label: "History",
            path: "/history",
            icon: <HistoryIcon />,
            end: true,
        },

        {
            label: "Reports",
            path: "/reports",
            icon: <Description />,
            end: true,
        },
    ];


    function drawerContent(
        isMobile = false
    ) {

        return (

            <Box
                sx={{
                    width: drawerWidth,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >

                {/* ==================================================
                    TOP SPACING
                ================================================== */}

                <Toolbar />


                {/* ==================================================
                    BRAND
                ================================================== */}

                <Box
                    sx={{
                        px: 2,
                        pt: 2,
                        pb: 1.5,
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >

                        <Security
                            color="primary"
                        />

                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            Security Operations
                        </Typography>

                    </Box>


                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        SentinelAI SOC
                    </Typography>

                </Box>


                <Divider />


                {/* ==================================================
                    NAVIGATION
                ================================================== */}

                <List
                    sx={{
                        px: 1,
                        py: 1.5,
                    }}
                >

                    {navigationItems.map(
                        (item) => (

                            <ListItemButton
                                key={
                                    item.path
                                }

                                component={NavLink}

                                to={item.path}

                                end={
                                    item.end
                                }

                                onClick={
                                    isMobile
                                        ? onMobileClose
                                        : undefined
                                }

                                sx={{
                                    mb: 0.5,

                                    borderRadius:
                                        2,

                                    color:
                                        "text.secondary",

                                    "& .MuiListItemIcon-root":
                                        {
                                            color:
                                                "inherit",

                                            minWidth:
                                                40,
                                        },

                                    "&:hover":
                                        {
                                            backgroundColor:
                                                "action.hover",

                                            color:
                                                "text.primary",
                                        },

                                    "&.active":
                                        {
                                            backgroundColor:
                                                "action.selected",

                                            color:
                                                "primary.main",

                                            fontWeight:
                                                700,

                                            "& .MuiListItemIcon-root":
                                                {
                                                    color:
                                                        "primary.main",
                                                },

                                            "& .MuiListItemText-primary":
                                                {
                                                    fontWeight:
                                                        700,
                                                },

                                            "&:hover":
                                                {
                                                    backgroundColor:
                                                        "action.selected",
                                                },
                                        },
                                }}
                            >

                                <ListItemIcon>
                                    {
                                        item.icon
                                    }
                                </ListItemIcon>

                                <ListItemText
                                    primary={
                                        item.label
                                    }
                                />

                            </ListItemButton>

                        )
                    )}

                </List>


                {/* ==================================================
                    FOOTER
                ================================================== */}

                <Box
                    sx={{
                        mt: "auto",
                        px: 2,
                        py: 2,
                    }}
                >

                    <Divider
                        sx={{
                            mb: 1.5,
                        }}
                    />

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        AI-Powered Security Operations
                    </Typography>

                </Box>

            </Box>
        );
    }


    return (
        <>
            {/* ====================================================
                DESKTOP SIDEBAR
            ==================================================== */}

            <Drawer
                variant="permanent"

                sx={{
                    display: {
                        xs: "none",
                        md: "block",
                    },

                    width: drawerWidth,

                    flexShrink: 0,

                    "& .MuiDrawer-paper":
                        {
                            width:
                                drawerWidth,

                            boxSizing:
                                "border-box",

                            borderRight:
                                "1px solid",

                            borderColor:
                                "divider",

                            backgroundColor:
                                "background.paper",
                        },
                }}
            >
                {
                    drawerContent(
                        false
                    )
                }
            </Drawer>


            {/* ====================================================
                MOBILE SIDEBAR
            ==================================================== */}

            <Drawer
                variant="temporary"

                open={
                    mobileOpen
                }

                onClose={
                    onMobileClose
                }

                ModalProps={{
                    keepMounted:
                        true,
                }}

                sx={{
                    display: {
                        xs: "block",
                        md: "none",
                    },

                    "& .MuiDrawer-paper":
                        {
                            width:
                                drawerWidth,

                            boxSizing:
                                "border-box",

                            backgroundColor:
                                "background.paper",
                        },
                }}
            >
                {
                    drawerContent(
                        true
                    )
                }
            </Drawer>
        </>
    );
}


export default Sidebar;