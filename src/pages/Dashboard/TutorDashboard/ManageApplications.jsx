import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FiUser,
  FiMail,
  FiBook,
  FiDollarSign,
  FiCheckCircle,
  FiClipboard,
} from "react-icons/fi";
import Spinner from "../../../components/Shared/Spinner";
import useAuth from "../../../hooks/useAuth";
import GradientHeading from "../../../components/Shared/GradientHeading";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: applications = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tutor-applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/applications`
      );
      return res.data;
    },
  });

  // Loading State
  if (isLoading) {
    return <Spinner />;
  }

  // Error State
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="alert max-w-md p-4 rounded-lg"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <span className="text-error">
            {error?.message || "Something went wrong"}
          </span>
        </div>
      </div>
    );
  }

  // console.log(applications);

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 text-center sm:mb-8">
          <GradientHeading text={"Manage Applications"}></GradientHeading>
          <p
            className="text-sm sm:text-base"
            style={{ color: "var(--color-text-muted)" }}
          >
            View and track all your tuition applications
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
                {applications.length}
              </p>
            </div>
            <div
              className="p-4 rounded-full"
              style={{ backgroundColor: "var(--color-primary-hover)" }}
            >
              <FiClipboard
                size={32}
                style={{ color: "var(--color-primary)" }}
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        {applications.length > 0 ? (
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
                    <th style={{ color: "var(--color-text-dark)" }}>Student</th>
                    <th style={{ color: "var(--color-text-dark)" }}>Subject</th>
                    <th style={{ color: "var(--color-text-dark)" }}>
                      Expected Salary
                    </th>
                    <th style={{ color: "var(--color-text-dark)" }}>Status</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {applications.map((app, index) => (
                    <tr
                      key={app._id}
                      className="hover:bg-primary/5 transition-colors"
                    >
                      {/* Index */}
                      <th style={{ color: "var(--color-text-dark)" }}>
                        {index + 1}
                      </th>

                      {/* Student Info */}
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
                              {app.studentName}
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
                              {app.studentEmail}
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
              <FiClipboard
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
                You haven't submitted any applications yet
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageApplications;
