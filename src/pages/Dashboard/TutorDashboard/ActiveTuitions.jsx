import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FiMail,
  FiBook,
  FiDollarSign,
  FiCheckCircle,
  FiBookOpen,
} from "react-icons/fi";
import Spinner from "../../../components/Shared/Spinner";
import GradientHeading from "../../../components/Shared/GradientHeading";

const TutorOngoingTuitions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: ongoingTuitions = [], isLoading } = useQuery({
    queryKey: ["tutorOngoingTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/tutor-ongoing-tuitions`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 text-center sm:mb-8">
          <GradientHeading text={"Active Tuitions"}></GradientHeading>
          <p
            className="text-sm sm:text-base"
            style={{ color: "var(--color-text-muted)" }}
          >
            Manage your ongoing tuition sessions
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
                Total Active Tuitions
              </p>
              <p
                className="text-3xl sm:text-4xl font-bold mt-1"
                style={{ color: "var(--color-primary)" }}
              >
                {ongoingTuitions.length}
              </p>
            </div>
            <div
              className="p-4 rounded-full"
              style={{ backgroundColor: "var(--color-primary-hover)" }}
            >
              <FiBookOpen size={32} style={{ color: "var(--color-primary)" }} />
            </div>
          </div>
        </div>

        {/* Table Section */}
        {ongoingTuitions.length > 0 ? (
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
                    <th style={{ color: "var(--color-text-dark)" }}>
                      Student Email
                    </th>
                    <th style={{ color: "var(--color-text-dark)" }}>Subject</th>
                    <th style={{ color: "var(--color-text-dark)" }}>Salary</th>
                    <th style={{ color: "var(--color-text-dark)" }}>Status</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {ongoingTuitions.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-primary/5 transition-colors"
                    >
                      {/* Index */}
                      <th style={{ color: "var(--color-text-dark)" }}>
                        {index + 1}
                      </th>

                      {/* Student Email */}
                      <td>
                        <div className="flex items-center gap-2">
                          <FiMail
                            size={14}
                            style={{ color: "var(--color-text-muted)" }}
                          />
                          <span
                            className="text-sm sm:text-base"
                            style={{ color: "var(--color-text-dark)" }}
                          >
                            {item.studentEmail}
                          </span>
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
                            {item.tuitionSubject}
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
                            ৳{item.salary}
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
                        <span className="badge badge-success gap-1 text-xs sm:text-sm">
                          <FiCheckCircle size={14} />
                          {item.status}
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
              <FiBookOpen
                size={64}
                className="mb-4"
                style={{ color: "var(--color-text-muted)" }}
              />
              <h3
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: "var(--color-text-dark)" }}
              >
                No Active Tuitions
              </h3>
              <p
                className="text-sm sm:text-base"
                style={{ color: "var(--color-text-muted)" }}
              >
                You don't have any active tuitions at the moment
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorOngoingTuitions;
