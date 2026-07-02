import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../pages/Signup";
import TestRide from "../pages/TestRide";
import RideHistory from "../pages/RideHistory";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import { Navigate } from "react-router-dom";
import DashboardV2 from "../pages/DashboardV2";
import SignupV2 from "../pages/SignupV2";
import LoginV2 from "../pages/LoginV2";
import EarningsV2 from "../pages/EarningsV2";
import ProfileV2 from "../pages/ProfileV2";
import RideHistoryV2 from "../pages/RideHistoryV2";
import RiderHistory from "../pages/RiderHistory";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route
  path="/"
  element={<Navigate to="/login" replace />}
/>
        <Route path="/signup" element={<SignupV2 />} />
        <Route path="/login" element={<LoginV2 />} />
        <Route
            path="/history"
            element={<ProtectedRoute>
                <RiderHistory/>
              </ProtectedRoute>}
            />

              <Route

        path="/earnings"

        element={

          <ProtectedRoute>

            <EarningsV2 />

          </ProtectedRoute>

        }

      />    
        
        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                <DashboardV2 />
                </ProtectedRoute>
            }
        />
        <Route path="/profile" element={<ProtectedRoute>
      <ProfileV2 />
    </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;