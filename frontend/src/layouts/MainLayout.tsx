import { useState } from "react";

import {
    Box,
    Toolbar,
} from "@mui/material";

import {
    Outlet,
} from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";


function MainLayout() {

    const [mobileOpen, setMobileOpen] =
        useState(false);


    function handleDrawerToggle() {
        setMobileOpen(
            (current) => !current
        );
    }


    function handleDrawerClose() {
        setMobileOpen(false);
    }


    return (

        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
            }}
        >

            {/* ====================================================
                NAVBAR
            ==================================================== */}

            <Navbar
                onMenuClick={
                    handleDrawerToggle
                }
            />


            {/* ====================================================
                SIDEBAR
            ==================================================== */}

            <Sidebar
                mobileOpen={
                    mobileOpen
                }
                onMobileClose={
                    handleDrawerClose
                }
            />


            {/* ====================================================
                MAIN CONTENT
            ==================================================== */}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,

                    width: {
                        xs: "100%",
                        md: "calc(100% - 240px)",
                    },

                    minWidth: 0,

                    p: {
                        xs: 0,
                        sm: 1,
                        md: 2,
                    },
                }}
            >

                {/* Navbar spacer */}

                <Toolbar />

                <Outlet />

            </Box>

        </Box>
    );
}


export default MainLayout;