import Spinner from "../components/Shared/Spinner";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

const RoleRoute = ({ children, allowedRoles }) => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) return <Spinner></Spinner>;
  if (allowedRoles.includes(role)) return children;

  return <Navigate to="/" replace />;
};

export default RoleRoute;
