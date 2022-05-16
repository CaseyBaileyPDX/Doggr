import React from "react";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useLocation, //for remembering where we came from
} from 'react-router-dom';
import {useAuth} from "../services/AuthService";

export const ProtectedRoute = ({children}) => {
  const context = useAuth();
  const location = useLocation();

  if (!context?.token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
