import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const DashboardIndex = () => {
  const navigate = useNavigate();
  const { role, isLoading: isRoleLoading } = useRole(); //  object destructuring

  useEffect(() => {
    if (isRoleLoading) return; // wait for role fetch
    if (!role) return; // no role found

    if (role === "student") navigate("my-tutions", { replace: true });
    else if (role === "tutor") navigate("active-tutions", { replace: true });
    else if (role === "admin") navigate("user-management", { replace: true });
  }, [role, isRoleLoading, navigate]);

  return null; // nothing to render
};

export default DashboardIndex;
