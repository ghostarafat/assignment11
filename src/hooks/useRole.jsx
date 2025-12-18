import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      try {
        const result = await axiosSecure(`/user/role?email=${user.email}`);
        return result.data?.role || null;
      } catch (error) {
        console.error("Error fetching role:", error);
        return null;
      }
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
