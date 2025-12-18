import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FiCheckCircle,
  FiEye,
  FiX,
  FiUser,
  FiMail,
  FiBook,
  FiAward,
  FiDollarSign,
} from "react-icons/fi";
import { FaCreditCard } from "react-icons/fa";
import Spinner from "../../../components/Shared/Spinner";
import useAuth from "../../../hooks/useAuth";
import GradientHeading from "../../../components/Shared/GradientHeading";
import { useState } from "react";
// import TutorDetailsModal from "../../../components/Modal/tutorDetailsModal";
import TutorDetailsModal from "../../../components/Modal/TutorDetailsModal";

const AppliedTutors = () => {
  const { user, loading: userLoading } = useAuth();
  const [selectedTutorId, setSelectedTutorId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const {
    data: myApplications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/my-applications`
      );
      return res.data;
    },
  });
  // console.log(myApplications);

  const { data: paymentData = [], isLoading: paymentLoading } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: () =>
      axiosSecure
        .get(`${import.meta.env.VITE_API_URL}/payment`)
        .then((res) => res.data),
  });

  if (isLoading || paymentLoading || userLoading) return <Spinner />;

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/applications/status/${id}`,
        { status: "approved" }
      );

      refetch();
    } catch (error) {
      console.error("Approve Error:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/applications/status/${id}`,
        { status: "rejected" }
      );

      refetch();
    } catch (error) {
      console.error("Reject Error:", error);
    }
  };

  const handlePayment = async (app) => {
    const paymentInfo = {
      price: app.salary,
      tuitionId: app.tuitionId,
      tutorEmail: app.tutorEmail,
      tutorName: app.tutorName,
      studentEmail: app.studentEmail,
      subject: app.tuitionSubject,
    };

    const res = await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );

    window.location.href = res.data.url;
  };

  const filteredApplications = myApplications.filter(
    (app) => app.status !== "rejected"
  );

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 text-center sm:mb-8">
          <GradientHeading text={"Applied Tutors"}></GradientHeading>
          <p
            className="text-lg sm:text-base"
            style={{ color: "var(--color-text-muted)" }}
          >
            Manage tutor applications for your tuition requests
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
                Total Applications
              </p>
              <p
                className="text-3xl sm:text-4xl font-bold mt-1"
                style={{ color: "var(--color-primary)" }}
              >
                {filteredApplications.length}
              </p>
            </div>
            <div
              className="p-4 rounded-full"
              style={{ backgroundColor: "var(--color-primary-hover)" }}
            >
              <FiUser size={32} style={{ color: "var(--color-primary)" }} />
            </div>
          </div>
        </div>

        {/* Table Section */}
        {filteredApplications.length > 0 ? (
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
                    <th style={{ color: "var(--color-text-dark)" }}>Tutor</th>
                    <th style={{ color: "var(--color-text-dark)" }}>Subject</th>
                    <th style={{ color: "var(--color-text-dark)" }}>
                      Qualification
                    </th>
                    <th style={{ color: "var(--color-text-dark)" }}>Salary</th>
                    <th style={{ color: "var(--color-text-dark)" }}>Status</th>
                    <th style={{ color: "var(--color-text-dark)" }}>Actions</th>
                    <th style={{ color: "var(--color-text-dark)" }}>Payment</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {filteredApplications.map((app, index) => (
                    <tr
                      key={app._id}
                      className="hover:bg-primary/5 transition-colors"
                    >
                      {/* Index */}
                      <th style={{ color: "var(--color-text-dark)" }}>
                        {index + 1}
                      </th>

                      {/* Tutor Info */}
                      <td>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <FiUser
                              size={14}
                              style={{ color: "var(--color-primary)" }}
                            />
                            <span
                              className="font-bold text-sm sm:text-base"
                              style={{ color: "var(--color-text-dark)" }}
                            >
                              {app.tutorName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiMail
                              size={12}
                              style={{ color: "var(--color-text-muted)" }}
                            />
                            <span
                              className="text-xs sm:text-sm"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              {app.tutorEmail}
                            </span>
                          </div>
                        </div>
                      </td>

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
                            {app.tuitionSubject}
                          </span>
                        </div>
                      </td>

                      {/* Qualification */}
                      <td>
                        <div className="flex items-center gap-2">
                          <FiAward
                            size={16}
                            style={{ color: "var(--color-secondary)" }}
                          />
                          <span
                            className="text-sm sm:text-base"
                            style={{ color: "var(--color-text-dark)" }}
                          >
                            {app.qualification}
                          </span>
                        </div>
                      </td>

                      {/* Salary */}
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
                            ৳{app.salary}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            /mo
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`badge gap-1 text-xs sm:text-sm ${
                            app.status === "approved"
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          <FiCheckCircle size={14} />
                          {app.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex gap-2">
                          {/* View Button */}
                          {/* <button
                            onClick={() => handleView(app._id)}
                            className="btn btn-ghost btn-sm hover:scale-105 transition-transform"
                            style={{ color: "var(--color-primary)" }}
                            title="View Details"
                          >
                            <FiEye size={18} />
                          </button> */}
                          <button
                            onClick={() => setSelectedTutorId(app._id)}
                            className="btn btn-ghost btn-sm hover:scale-105 transition-transform"
                            style={{ color: "var(--color-primary)" }}
                            title="View Details"
                          >
                            <FiEye size={18} />
                          </button>
                          {app.status !== "approved" && (
                            <>
                              <button
                                onClick={() => handleApprove(app._id)}
                                className="btn btn-ghost btn-sm text-success hover:scale-105 transition-transform"
                                title="Approve"
                              >
                                <FiCheckCircle size={18} />
                              </button>

                              <button
                                onClick={() => handleReject(app._id)}
                                className="btn btn-ghost btn-sm text-error hover:scale-105 transition-transform"
                                title="Reject"
                              >
                                <FiX size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Payment */}
                      <td>
                        {(() => {
                          const isPaid = paymentData.some(
                            (payment) =>
                              payment.tuitionId === app.tuitionId &&
                              payment.tutorEmail === app.tutorEmail &&
                              payment.paymentStatus === "paid"
                          );

                          if (isPaid) {
                            return (
                              <button
                                disabled
                                className="btn btn-sm font-bold gap-2 border-none bg-success text-white cursor-not-allowed"
                                title="Payment completed"
                              >
                                <FiCheckCircle size={16} />
                                <span>Paid</span>
                              </button>
                            );
                          }

                          return (
                            <button
                              onClick={() =>
                                app.status === "approved" && handlePayment(app)
                              }
                              disabled={app.status !== "approved"}
                              className={`btn btn-sm font-bold gap-2 border-none transition-all shadow-md ${
                                app.status === "approved"
                                  ? "text-white hover:scale-105 hover:shadow-lg cursor-pointer"
                                  : "opacity-50 cursor-not-allowed"
                              }`}
                              style={{
                                background:
                                  app.status === "approved"
                                    ? "linear-gradient(to right, var(--color-primary), var(--color-secondary))"
                                    : "var(--color-text-muted)",
                              }}
                              title={
                                app.status === "approved"
                                  ? "Proceed to Payment"
                                  : "Approve application first"
                              }
                            >
                              <FaCreditCard size={16} />
                              <span>Pay Now</span>
                            </button>
                          );
                        })()}
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
              <FiUser
                size={64}
                className="mb-4"
                style={{ color: "var(--color-text-muted)" }}
              />
              <h3
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: "var(--color-text-dark)" }}
              >
                No Applications Yet
              </h3>
              <p
                className="text-sm sm:text-base"
                style={{ color: "var(--color-text-muted)" }}
              >
                You haven't received any tutor applications yet
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Popup Modal */}
      {selectedTutorId && (
        <TutorDetailsModal
          id={selectedTutorId}
          onClose={() => setSelectedTutorId(null)}
        />
      )}
    </div>
  );
};

export default AppliedTutors;
