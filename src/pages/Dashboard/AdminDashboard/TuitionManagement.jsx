import { useQuery } from "@tanstack/react-query";

import AdminTuitionTable from "../../../components/TableRows/AdminTuitionTable";
import Spinner from "../../../components/Shared/Spinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import GradientHeading from "../../../components/Shared/GradientHeading";

const TuitionManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["allTuitionsAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/all-tuitions-admin?admin=true`
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
        <GradientHeading text={"Tuition Management"}></GradientHeading>

        <p
          className="text-lg text-center sm:text-base"
          style={{ color: "var(--color-text-muted)" }}
        >
          Manage all tuition in the system
        </p>
      </div>
      <AdminTuitionTable data={data} refetch={refetch}></AdminTuitionTable>
    </div>
  );
};

export default TuitionManagement;
