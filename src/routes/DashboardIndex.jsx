import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const DashboardIndex = () => {
  const navigate = useNavigate();
  const [role, isRoleLoading] = useRole();

  useEffect(() => {
    if (isRoleLoading) return;

    if (!role) return;
    if (role === "student") navigate("my-tuitions", { replace: true });
    else if (role === "tutor") navigate("active-tuitions", { replace: true });
    else if (role === "admin") navigate("user-management", { replace: true });
  }, [role, isRoleLoading, navigate]);

  return null;
};

export default DashboardIndex;
