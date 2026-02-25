import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/signup" replace />;
};
