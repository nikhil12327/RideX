import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  
  import Login from "../pages/Login";
  import Signup from "../pages/Signup";
  import Dashboard from "../pages/Dashboard";
  import Profile from "../pages/Profile";
  import ProtectedRoute from "./ProtectedRoute";
  import RideHistory from "../pages/RideHistory";
import DashboardV2 from "../pages/DashboardV2";
import LoginV2 from "../pages/LoginV2";
import SignupV2 from "../pages/SignupV2";
import ProfileV2 from "../pages/ProfileV2";
import RideHistoryV2 from "../pages/RideHistoryV2";
import Wallet from "../pages/Wallet";
import Notifications from "../pages/Notifications";
import Favorites from "../pages/Favorites";
import WalletPage from "../pages/Wallet";
  const AppRoutes = () => {
  
    return (
      <BrowserRouter>
  
        <Routes>
  
          <Route
            path="/"
            element={<LoginV2 />}
          />
  
          <Route
            path="/login"
            element={<LoginV2 />}
          />
  
          <Route
            path="/signup"
            element={<SignupV2 />}
          />
  
          <Route
            path="/dashboard"
            element={<DashboardV2 />}
          />
         <Route
            path="/history"
            element={
                <ProtectedRoute>
                <RideHistoryV2 />
                </ProtectedRoute>
            }
            />
            <Route
            path="/profile"
            element={
                <ProtectedRoute>
                  <ProfileV2 />
                </ProtectedRoute>
            }
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wallet"
              element={
                <ProtectedRoute>
                  <WalletPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
  
        </Routes>
  
      </BrowserRouter>
    );
  };
  
  export default AppRoutes;