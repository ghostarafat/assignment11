import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Spinner from "../components/Shared/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner></Spinner>;

  if (user) {
    return children;
  }
  if (!user) {
    return <Navigate to={"/login"} state={location.pathname}></Navigate>;
  }
};

export default PrivateRoute;
