import { useQuery } from "@tanstack/react-query";

import AdmintutionTable from "../../../components/TableRows/AdmintutionTable";
import Spinner from "../../../components/Shared/Spinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import GradientHeading from "../../../components/Shared/GradientHeading";

const tutionManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["alltutionsAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/all-tutions-admin?admin=true`
      );
      return res.data;
    },
  });

  if (isLoading) return <Spinner></Spinner>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6 text-center sm:mb-8">
        <GradientHeading text={"tution Management"}></GradientHeading>

        <p
          className="text-lg text-center sm:text-base"
          style={{ color: "var(--color-text-muted)" }}
        >
          Manage all tution in the system
        </p>
      </div>
      <AdmintutionTable data={data} refetch={refetch}></AdmintutionTable>
    </div>
  );
};

export default tutionManagement;
