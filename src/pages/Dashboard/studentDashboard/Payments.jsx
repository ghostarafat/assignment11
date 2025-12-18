import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  FiBook,
  FiMail,
  FiDollarSign,
  FiCheckCircle,
  FiCalendar,
  FiCreditCard,
} from "react-icons/fi";
import { FaReceipt } from "react-icons/fa";
import Spinner from "../../../components/Shared/Spinner";
import GradientHeading from "../../../components/Shared/GradientHeading";
import Error from "../../Error";

const Payments = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: paymentData = [],
    isLoading: paymentLoading,
    error,
  } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: () =>
      axiosSecure
        .get(`${import.meta.env.VITE_API_URL}/payment`)
        .then((res) => res.data),
  });
  // console.log(paymentData);

  if (loading || paymentLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Error/>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 text-center sm:mb-8">
          <GradientHeading text={" Payment History"}></GradientHeading>
          <p
            className="text-sm sm:text-base"
            style={{ color: "var(--color-text-muted)" }}
          >
            View all your tuition payment transactions
          </p>
        </div>

        {/* Stats Card */}
        <div
          className="rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Total Payments
              </p>
              <p
                className="text-3xl sm:text-4xl font-bold mt-1"
                style={{ color: "var(--color-primary)" }}
              >
                {paymentData.length}
              </p>
            </div>
            <div
              className="p-4 rounded-full"
              style={{ backgroundColor: "var(--color-primary-hover)" }}
            >
              <FaReceipt size={32} style={{ color: "var(--color-primary)" }} />
            </div>
          </div>
        </div>

        {/* Table Section */}
        {paymentData.length > 0 ? (
          <div
            className="rounded-xl shadow-2xl overflow-hidden border"
            style={{
              backgroundColor: "var(--color-card-bg)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="overflow-x-auto">
              <table className="table">
                {/* Table Head */}
                <thead
                  style={{ backgroundColor: "var(--color-primary-hover)" }}
                >
                  <tr>
                    <th style={{ color: "var(--color-text-dark)" }}>#</th>
                    <th style={{ color: "var(--color-text-dark)" }}>Subject</th>
                    <th style={{ color: "var(--color-text-dark)" }}>
                      Tutor Email
                    </th>
                    <th style={{ color: "var(--color-text-dark)" }}>Amount</th>
                    <th style={{ color: "var(--color-text-dark)" }}>
                      Transaction ID
                    </th>
                    <th style={{ color: "var(--color-text-dark)" }}>Status</th>
                    <th style={{ color: "var(--color-text-dark)" }}>
                      Payment Date
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {paymentData.map((payment, index) => (
                    <tr
                      key={payment._id || index}
                      className="hover:bg-primary/5 transition-colors"
                    >
                      {/* Index */}
                      <th style={{ color: "var(--color-text-dark)" }}>
                        {index + 1}
                      </th>

                      {/* Subject */}
                      <td>
                        <div className="flex items-center gap-2">
                          <FiBook
                            size={16}
                            style={{ color: "var(--color-primary)" }}
                          />
                          <span
                            className="font-semibold text-sm sm:text-base"
                            style={{ color: "var(--color-text-dark)" }}
                          >
                            {payment.subject}
                          </span>
                        </div>
                      </td>

                      {/* Tutor Email */}
                      <td>
                        <div className="flex items-center gap-2">
                          <FiMail
                            size={14}
                            style={{ color: "var(--color-text-muted)" }}
                          />
                          <span
                            className="text-xs sm:text-sm"
                            style={{ color: "var(--color-text-dark)" }}
                          >
                            {payment.tutorEmail}
                          </span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td>
                        <div className="flex items-center gap-1">
                          <FiDollarSign
                            size={16}
                            style={{ color: "var(--color-primary)" }}
                          />
                          <span
                            className="font-bold text-sm sm:text-base"
                            style={{ color: "var(--color-primary)" }}
                          >
                            ${payment.amount}
                          </span>
                          <span
                            className="text-xs uppercase"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {payment.currency}
                          </span>
                        </div>
                      </td>

                      {/* Transaction ID */}
                      <td>
                        <div className="flex items-center gap-2">
                          <FiCreditCard
                            size={14}
                            style={{ color: "var(--color-secondary)" }}
                          />
                          <span
                            className="text-xs sm:text-sm font-mono"
                            style={{ color: "var(--color-text-dark)" }}
                          >
                            {payment.transactionId.substring(0, 20)}...
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span className="badge badge-success gap-1 text-xs sm:text-sm">
                          <FiCheckCircle size={14} />
                          {payment.paymentStatus}
                        </span>
                      </td>

                      {/* Payment Date */}
                      <td>
                        <div className="flex items-center gap-2">
                          <FiCalendar
                            size={14}
                            style={{ color: "var(--color-text-muted)" }}
                          />
                          <span
                            className="text-xs sm:text-sm"
                            style={{ color: "var(--color-text-dark)" }}
                          >
                            {formatDate(payment.paidAt)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl shadow-lg p-8 sm:p-12 border"
            style={{
              backgroundColor: "var(--color-card-bg)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <FaReceipt
                size={64}
                className="mb-4"
                style={{ color: "var(--color-text-muted)" }}
              />
              <h3
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: "var(--color-text-dark)" }}
              >
                No Payments Yet
              </h3>
              <p
                className="text-sm sm:text-base"
                style={{ color: "var(--color-text-muted)" }}
              >
                You haven't made any payments yet
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
