import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user, loading } = useAuth();
  const token = user?.accessToken; // firebase token

  return useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const response = await axios.get(
        `https://edu-plus-server-alpha.vercel.app/user/role?email=${user.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.role;
    },
    enabled: !!user && !loading,
  });
};

export default useRole;
