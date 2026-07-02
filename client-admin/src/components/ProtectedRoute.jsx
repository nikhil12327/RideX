import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();

  if (!auth.currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;