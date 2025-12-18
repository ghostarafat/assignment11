import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiMapPin,
  FiBook,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiSend,
  FiPhone,
  FiInfo,
} from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import useRole from "../hooks/useRole";
import ApplyTuitionModal from "../components/Modal/ApplyTuitionModal";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../components/Shared/Spinner";

const TuitionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [role, isRoleLoading] = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: tuition,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tuition", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tuitions-details/${id}`
      );
      return res.data;
    },
  });

  const handleApply = () => {
    if (!tuition) return;
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
  };

  const handleApplicationSubmit = async (applicationData) => {
    try {
      setIsSubmitting(true);

      const res = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/applications`,
        applicationData
      );

      if (res.data) {
        toast.success(`Successfully applied for ${tuition.subject}!`);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (isLoading || isRoleLoading) {
    return <Spinner></Spinner>;
  }

  if (error || !tuition) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="alert max-w-md p-6 rounded-xl shadow-lg"
          style={{
            backgroundColor: "var(--color-error-bg)",
            borderColor: "var(--color-error)",
          }}
        >
          <FiInfo size={24} className="text-error" />
          <div>
            <h3 className="font-bold text-error">Error Loading Details</h3>
            <div className="text-sm text-error">
              Unable to load tuition details. Please try again later.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: "var(--color-bg-soft)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost gap-2 mb-6 hover:scale-105 transition-transform"
            style={{ color: "var(--color-primary)" }}
          >
            <FiArrowLeft size={20} />
            Back to Listings
          </button>

          <div className="text-center mb-6">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
              style={{
                background:
                  "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tuition Details
            </h1>
            <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
              Complete information about this tuition opportunity
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student Information Card */}
          <div className="lg:col-span-1">
            <div
              className="rounded-xl shadow-2xl border overflow-hidden"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              {/* Card Header */}
              <div
                className="p-6 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary-hover), var(--color-secondary-hover))",
                }}
              >
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-xl">
                    <img src={tuition.studentPhoto} alt={tuition.studentName} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-4 text-white">
                  {tuition.studentName}
                </h3>
              </div>

              {/* Contact Information */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  ></div>
                  <h4
                    className="text-lg font-bold"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Contact Information
                  </h4>
                </div>

                <div
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: "var(--color-bg-soft)" }}
                >
                  <FiMail size={18} style={{ color: "var(--color-primary)" }} />
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Email Address
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
                        Phone Number
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
                      {formatDate(tuition.created_at)}
                    </p>
                  </div>
                </div>

                {/* Apply Button */}
                {role === "tutor" && (
                  <div className="pt-4">
                    <button
                      onClick={handleApply}
                      className="btn w-full text-white font-bold border-none hover:scale-105 transition-transform flex items-center gap-2"
                      style={{
                        background:
                          "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                      }}
                    >
                      <FiSend size={16} />
                      Apply for this Tuition
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tuition Details Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Details */}
            <div
              className="rounded-xl shadow-2xl p-8 border"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                ></div>
                <h2
                  className="text-3xl font-extrabold"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  Tuition Requirements
                </h2>
              </div>

              {/* Subject and Class Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Subject */}
                <div
                  className="p-6 rounded-xl border"
                  style={{
                    backgroundColor: "var(--color-primary-hover)",
                    borderColor: "var(--color-primary)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FiBook size={24} />
                    <span className="text-sm font-medium">Subject</span>
                  </div>
                  <p className="text-2xl font-bold">{tuition.subject}</p>
                </div>

                {/* Class */}
                <div
                  className="p-6 rounded-xl border"
                  style={{
                    backgroundColor: "var(--color-secondary-hover)",
                    borderColor: "var(--color-secondary)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium">Class Level</span>
                  </div>
                  <p className="text-2xl font-bold">{tuition.class}</p>
                </div>
              </div>

              {/* Location and Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div
                  className="p-6 rounded-xl border"
                  style={{
                    backgroundColor: "var(--color-success-hover)",
                    borderColor: "var(--color-success)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FiMapPin
                      size={24}
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
                    className="text-xl font-bold"
                    style={{ color: "var(--color-success)" }}
                  >
                    {tuition.location}
                  </p>
                </div>

                {/* Budget */}
                <div
                  className="p-6 rounded-xl border"
                  style={{
                    backgroundColor: "var(--color-warning-hover)",
                    borderColor: "var(--color-warning)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FiDollarSign
                      size={24}
                      style={{ color: "var(--color-warning)" }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Monthly Budget
                    </span>
                  </div>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "var(--color-warning)" }}
                  >
                    ৳{tuition.budget?.toLocaleString()}
                    <span
                      className="text-sm font-normal ml-2"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      per month
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div
              className="rounded-xl shadow-2xl p-6 border"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div
                    className="p-3 rounded-full mx-auto mb-2 w-fit"
                    style={{ backgroundColor: "var(--color-primary-hover)" }}
                  >
                    <FiUser size={24} />
                  </div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Student Level
                  </p>
                  <p
                    className="font-bold"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {tuition.class}
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className="p-3 rounded-full mx-auto mb-2 w-fit"
                    style={{ backgroundColor: "var(--color-success-hover)" }}
                  >
                    <FiMapPin
                      size={24}
                      style={{ color: "var(--color-success)" }}
                    />
                  </div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Teaching Mode
                  </p>
                  <p
                    className="font-bold"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {tuition.location?.includes("Online")
                      ? "Online"
                      : "In-Person"}
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className="p-3 rounded-full mx-auto mb-2 w-fit"
                    style={{ backgroundColor: "var(--color-warning-hover)" }}
                  >
                    <FiDollarSign
                      size={24}
                      style={{ color: "var(--color-warning)" }}
                    />
                  </div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Payment Type
                  </p>
                  <p
                    className="font-bold"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Monthly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <ApplyTuitionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        tuition={tuition}
        onSubmit={handleApplicationSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default TuitionDetails;
