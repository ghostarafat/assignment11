// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/RootLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Profile from "../pages/Dashboard/studentDashboard/Profile";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

import Mytutions from "../pages/Dashboard/studentDashboard/Mytutions";
import Posttution from "../pages/Dashboard/studentDashboard/Posttution";
import AppliedTutors from "../pages/Dashboard/studentDashboard/AppliedTutors";
import Payments from "../pages/Dashboard/studentDashboard/Payments";
import PaymentSuccess from "../pages/Dashboard/studentDashboard/PaymentSuccess";

import Activetutions from "../pages/Dashboard/TutorDashboard/Activetutions";
import Earnings from "../pages/Dashboard/TutorDashboard/Earnings";
import ManageApplications from "../pages/Dashboard/TutorDashboard/ManageApplications";

import UserManagement from "../pages/Dashboard/AdminDashboard/UserManagement";
import TutionManagement from "../pages/Dashboard/AdminDashboard/TutionManagement";
import Reports from "../pages/Dashboard/AdminDashboard/Reports";

import Alltutions from "../pages/tutions/Alltutions";
import TutionDetails from "../pages/tutionDetails";
import Spinner from "../components/Shared/Spinner";
import DashboardIndex from "./DashboardIndex";
import Tutor from "../pages/Tutor/Tutor";
import TutorDetails from "../pages/Tutor/TutorDetails";
import About from "../pages/About";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: <Spinner />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/all-tutions", element: <Alltutions /> },
      {
        path: "/tutions-details/:id",
        element: (
          <PrivateRoute>
            <TutionDetails />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/tutor", element: <Tutor /> },
      { path: "/about", element: <About /> },
      {
        path: "/tutors/:id",
        element: (
          <PrivateRoute>
            <TutorDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    hydrateFallbackElement: <Spinner />,
    errorElement: <Error />,
    children: [
      { index: true, element: <DashboardIndex /> },

      // Student
      {
        path: "my-tutions",
        element: (
          <RoleRoute allowedRoles={["student"]}>
            <Mytutions />
          </RoleRoute>
        ),
      },
      {
        path: "post-tution",
        element: (
          <RoleRoute allowedRoles={["student"]}>
            <Posttution />
          </RoleRoute>
        ),
      },
      {
        path: "applied-tutors",
        element: (
          <RoleRoute allowedRoles={["student"]}>
            <AppliedTutors />
          </RoleRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <RoleRoute allowedRoles={["student"]}>
            <Payments />
          </RoleRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <RoleRoute allowedRoles={["student"]}>
            <PaymentSuccess />
          </RoleRoute>
        ),
      },

      // Tutor
      {
        path: "active-tutions",
        element: (
          <RoleRoute allowedRoles={["tutor"]}>
            <Activetutions />
          </RoleRoute>
        ),
      },
      {
        path: "manage-applications",
        element: (
          <RoleRoute allowedRoles={["tutor"]}>
            <ManageApplications />
          </RoleRoute>
        ),
      },
      {
        path: "earnings",
        element: (
          <RoleRoute allowedRoles={["tutor"]}>
            <Earnings />
          </RoleRoute>
        ),
      },

      // Admin
      {
        path: "user-management",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <UserManagement />
          </RoleRoute>
        ),
      },
      {
        path: "tution-management",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <TutionManagement />
          </RoleRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <Reports />
          </RoleRoute>
        ),
      },

      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default router;
