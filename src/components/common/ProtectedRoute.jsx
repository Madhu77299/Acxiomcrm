import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Unauthorized from "../../pages/auth/Unauthorized";

const ProtectedRoute = ({ requiredModule, requiredAction = "view" }) => {
  const { currentUser, hasPermission } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredModule && !hasPermission(requiredModule, requiredAction)) {
    return <Unauthorized module={requiredModule} action={requiredAction} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
