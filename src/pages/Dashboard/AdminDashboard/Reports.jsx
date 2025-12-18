import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Shared/Spinner";
import ReportTable from "../../../components/TableRows/ReportTable";

const Reports = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: allPaymentData = [], isLoading: allPaymentDataLoading } =
    useQuery({
      queryKey: ["all-payment", user?.email],
      queryFn: () =>
        axiosSecure
          .get(`${import.meta.env.VITE_API_URL}/all-payment`)
          .then((res) => res.data),
    });
  // console.log(allPaymentData);

  if (loading || allPaymentDataLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <ReportTable allPaymentData={allPaymentData}></ReportTable>
    </div>
  );
};

export default Reports;
