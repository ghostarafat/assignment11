import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/RootLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Profile from "../pages/Dashboard/studentDashboard/Profile";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";
import MyTuitions from "../pages/Dashboard/studentDashboard/MyTuitions";
import PostTuition from "../pages/Dashboard/studentDashboard/PostTuition";
import AppliedTutors from "../pages/Dashboard/studentDashboard/AppliedTutors";
import Payments from "../pages/Dashboard/studentDashboard/Payments";
import ActiveTuitions from "../pages/Dashboard/TutorDashboard/ActiveTuitions";
import Earnings from "../pages/Dashboard/TutorDashboard/Earnings";
import ManageApplications from "../pages/Dashboard/TutorDashboard/ManageApplications";
import UserManagement from "../pages/Dashboard/AdminDashboard/UserManagement";
import TuitionManagement from "../pages/Dashboard/AdminDashboard/TuitionManagement";
import Reports from "../pages/Dashboard/AdminDashboard/Reports";

import AllTuitions from "../pages/Tuitions/AllTuitions";
import TuitionDetails from "../pages/TuitionDetails";
import PaymentSuccess from "../pages/Dashboard/studentDashboard/PaymentSuccess";
import Spinner from "../components/Shared/Spinner";
import DashboardIndex from "./DashboardIndex";
import Tutor from "../pages/Tutor/Tutor";
import TutorDetails from "../pages/Tutor/TutorDetails";
import About from "../pages/About";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,

    hydrateFallbackElement: <Spinner></Spinner>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-tuitions",
        element: <AllTuitions></AllTuitions>,
      },
      {
        path: "/tuitions-details/:id",
        element: (
          <PrivateRoute>
            <TuitionDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/tutor",
        element: <Tutor></Tutor>,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/tutors/:id",
        element: (
          <PrivateRoute>
            <TutorDetails></TutorDetails>
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
    hydrateFallbackElement: <Spinner></Spinner>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
      // ----------------- STUDENT ROUTES -----------------
      {
        path: "my-tuitions",
        element: (
          <RoleRoute allowedRoles={["student"]}>
            <MyTuitions />
          </RoleRoute>
        ),
      },
      {
        path: "post-tuition",
        element: (
          <RoleRoute allowedRoles={["student"]}>
            <PostTuition />
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
            <PaymentSuccess></PaymentSuccess>
          </RoleRoute>
        ),
      },

      // ----------------- TUTOR ROUTES -----------------
      {
        path: "active-tuitions",
        element: (
          <RoleRoute allowedRoles={["tutor"]}>
            <ActiveTuitions />
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
      // ----------------- ADMIN ROUTES -----------------
      {
        path: "user-management",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <UserManagement />
          </RoleRoute>
        ),
      },
      {
        path: "tuition-management",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <TuitionManagement />
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

      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
