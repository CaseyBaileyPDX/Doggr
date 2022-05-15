import React from "react";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import {useAuth} from "../services/AuthService";

export const ProtectedRoute = ({children}) => {
  const context = useAuth();
  if (!context?.token) {
    return <Navigate to="/login" />;
  }

  return children;
}
