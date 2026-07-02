import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  
  import AdminDashboard from "../pages/AdminDashboard";
  import Login from "../pages/login";
  import ProtectedRoute from "../components/ProtectedRoute";
  import AdminDashboardV2 from "../pages/AdminDashboardV2";
  import LoginV2 from "../pages/loginV2";

  const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
  
          <Route
            path="/"
            element={<LoginV2 />}
          />
  
          <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboardV2 />
    </ProtectedRoute>
  }
/>
  
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRoutes;