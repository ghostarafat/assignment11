import Spinner from "../components/Shared/Spinner";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, allowedRoles }) => {
  const { role, isLoading } = useRole();

  if (isLoading) return <Spinner />;

  if (allowedRoles.includes(role)) return children;

  return <Navigate to="/" replace />;
};

export default RoleRoute;
