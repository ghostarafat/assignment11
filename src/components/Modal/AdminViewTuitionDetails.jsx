import { useQuery } from "@tanstack/react-query";
import {
  FiX,
  FiUser,
  FiMail,
  FiMapPin,
  FiBook,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiPhone,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../Shared/Spinner";

const AdminViewTuitionDetails = ({ isOpen, onClose, tuitionId }) => {
  const axiosSecure = useAxiosSecure();

  const { data: tuition, isLoading } = useQuery({
    queryKey: ["tuitionDetailsAdmin", tuitionId],
    enabled: !!tuitionId && isOpen,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/tuitions-details/${tuitionId}`
      );
      return res.data;
    },
  });

  if (!isOpen) return null;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case "approved":
        return {
          color: "badge-success",
          icon: <FiCheckCircle size={16} />,
          bgColor: "var(--color-success)",
        };
      case "rejected":
        return {
          color: "badge-error",
          icon: <FiXCircle size={16} />,
          bgColor: "var(--color-error)",
        };
      default:
        return {
          color: "badge-warning",
          icon: <FiAlertCircle size={16} />,
          bgColor: "var(--color-warning)",
        };
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h3
            className="text-2xl sm:text-3xl font-extrabold"
            style={{
              background:
                "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Tuition Details
          </h3>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost hover:scale-105 transition-transform"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
         
            <Spinner />
          
        )}

        {/* Content */}
        {tuition && !isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student Information Card */}
            <div className="lg:col-span-1">
              <div
                className="rounded-xl shadow-lg p-6 border"
                style={{
                  backgroundColor: "var(--color-card-bg)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  ></div>
                  <h4
                    className="text-lg font-bold"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Student Information
                  </h4>
                </div>

                {/* Student Avatar and Basic Info */}
                <div className="text-center mb-6">
                  <div className="avatar">
                    <div
                      className="mask mask-squircle h-24 w-24 ring-4 mx-auto"
                      style={{ borderColor: "var(--color-primary)" }}
                    >
                      <img
                        src={tuition.studentPhoto}
                        alt={tuition.studentName}
                      />
                    </div>
                  </div>
                  <h3
                    className="text-xl font-bold mt-3"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {tuition.studentName}
                  </h3>
                  <div className="flex justify-center mt-2">
                    <span
                      className={`badge gap-1 ${
                        getStatusInfo(tuition.status).color
                      }`}
                    >
                      {getStatusInfo(tuition.status).icon}
                      {tuition.status || "pending"}
                    </span>
                  </div>
                </div>
                {/* Contact Information */}
                <div className="space-y-3">
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-bg-soft)" }}
                  >
                    <FiMail
                      size={18}
                      style={{ color: "var(--color-primary)" }}
                    />
                    <div>
                      <p
                        className="text-xs font-medium"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Email
                      </p>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {tuition.studentEmail}
                      </p>
                    </div>
                  </div>

                  {tuition.studentPhone && (
                    <div
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ backgroundColor: "var(--color-bg-soft)" }}
                    >
                      <FiPhone
                        size={18}
                        style={{ color: "var(--color-secondary)" }}
                      />
                      <div>
                        <p
                          className="text-xs font-medium"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          Phone
                        </p>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "var(--color-text-dark)" }}
                        >
                          {tuition.studentPhone}
                        </p>
                      </div>
                    </div>
                  )}

                  <div
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-bg-soft)" }}
                  >
                    <FiCalendar
                      size={18}
                      style={{ color: "var(--color-success)" }}
                    />
                    <div>
                      <p
                        className="text-xs font-medium"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Posted On
                      </p>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {formatDate(tuition.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tuition Details Card */}
            <div className="lg:col-span-2">
              <div
                className="rounded-xl shadow-lg p-6 border"
                style={{
                  backgroundColor: "var(--color-card-bg)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  ></div>
                  <h4
                    className="text-lg font-bold"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Tuition Requirements
                  </h4>
                </div>

                {/* Main Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Subject */}
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: "var(--color-bg-soft)" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FiBook
                        size={20}
                        style={{ color: "var(--color-primary)" }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Subject
                      </span>
                    </div>
                    <p
                      className="text-xl font-bold"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      {tuition.subject}
                    </p>
                  </div>

                  {/* Class */}
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: "var(--color-bg-soft)" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Class
                      </span>
                    </div>
                    <p
                      className="text-xl font-bold"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      {tuition.class}
                    </p>
                  </div>

                  {/* Location */}
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: "var(--color-bg-soft)" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FiMapPin
                        size={20}
                        style={{ color: "var(--color-success)" }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Location
                      </span>
                    </div>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      {tuition.location}
                    </p>
                  </div>

                  {/* Budget */}
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: "var(--color-bg-soft)" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FiDollarSign
                        size={20}
                        style={{ color: "var(--color-warning)" }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Budget
                      </span>
                    </div>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      ৳{tuition.budget}
                      <span
                        className="text-sm font-normal ml-1"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        /month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="modal-action">
          <button
            onClick={onClose}
            className="btn text-white font-bold border-none"
            style={{
              background:
                "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
            }}
          >
            Close
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default AdminViewTuitionDetails;
