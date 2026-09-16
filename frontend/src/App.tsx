import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
import Analytics from "./pages/Analytics/Analytics";
import Incidents from "./pages/Incidents/Incidents";
import IncidentDetails from "./pages/IncidentDetails/IncidentDetails";
import History from "./pages/History/History";
import Reports from "./pages/Reports/Reports";
import Upload from "./pages/Upload/Upload";


function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* ==================================================
                    PUBLIC ROUTES
                ================================================== */}

                <Route
                    path="/"
                    element={
                        <Login />
                    }
                />

                <Route
                    path="/register"
                    element={
                        <Register />
                    }
                />


                {/* ==================================================
                    PROTECTED APPLICATION
                ================================================== */}

                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >

                    {/* ==================================================
                        DASHBOARD
                    ================================================== */}

                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard />
                        }
                    />


                    {/* ==================================================
                        ANALYTICS
                    ================================================== */}

                    <Route
                        path="/analytics"
                        element={
                            <Analytics />
                        }
                    />


                    {/* ==================================================
                        INCIDENT MANAGEMENT
                    ================================================== */}

                    <Route
                        path="/incidents"
                        element={
                            <Incidents />
                        }
                    />


                    {/* ==================================================
                        LOG UPLOAD / ANALYSIS
                    ================================================== */}

                    <Route
                        path="/incidents/upload"
                        element={
                            <Upload />
                        }
                    />


                    {/* ==================================================
                        INCIDENT DETAILS
                    ================================================== */}

                    <Route
                        path="/incidents/:id"
                        element={
                            <IncidentDetails />
                        }
                    />


                    {/* ==================================================
                        HISTORY
                    ================================================== */}

                    <Route
                        path="/history"
                        element={
                            <History />
                        }
                    />


                    {/* ==================================================
                        REPORTS
                    ================================================== */}

                    <Route
                        path="/reports"
                        element={
                            <Reports />
                        }
                    />

                </Route>


                {/* ==================================================
                    FALLBACK
                ================================================== */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;