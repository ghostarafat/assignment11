import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: role, isLoading: roleLoading, error } = useRole();

  if (authLoading || roleLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading role: {error.message}</div>;

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div>
      <Navbar />
      <div className="dashboard-layout">
        {role === "admin" && <p>Admin Dashboard</p>}
        {role === "tutor" && <p>Tutor Dashboard</p>}
        {role === "student" && <p>Student Dashboard</p>}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
