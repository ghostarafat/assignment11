// src/hooks/useRole.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (loading || !user?.email) return;

    axios
      .get(`http://localhost:3000/user/role/${user.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setRole(res.data.role);
        setRoleLoading(false);
      })
      .catch((err) => {
        console.error("useRole error:", err);
        setRoleLoading(false);
      });
  }, [user?.email, loading]);

  return { role, roleLoading };
};

export default useRole;
