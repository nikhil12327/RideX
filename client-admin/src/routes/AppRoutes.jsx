import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  
  import AdminDashboard from "../pages/AdminDashboard";
  
  const AppRoutes = () => {
  
    return (
  
      <BrowserRouter>
  
        <Routes>
  
          <Route
            path="/"
            element={
              <AdminDashboard />
            }
          />
  
        </Routes>
  
      </BrowserRouter>
  
    );
  
  };
  
  export default AppRoutes;