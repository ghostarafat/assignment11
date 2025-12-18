import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FiSearch,
  FiEye,
  FiBook,
  FiMapPin,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";

import Spinner from "../../../components/Shared/Spinner";
import GradientHeading from "../../../components/Shared/GradientHeading";
import Error from "../../Error";

const MyTuitions = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: tuitionData,
    isLoading: tuitionDataLoading,
    error,
  } = useQuery({
    queryKey: ["tuitionsApproved", user?.email],
    queryFn: () =>
      axiosSecure
        .get(`${import.meta.env.VITE_API_URL}/tuitions?status=approved`)
        .then((res) => res.data),
  });

  if (loading || tuitionDataLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Error/>
    );
  }

  // Filter tuitions based on search
  const filteredTuitions = tuitionData?.filter((tuition) => {
    const matchesSearch =
      tuition.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tuition.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tuition.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tuition.studentName?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 text-center sm:mb-8">
          <GradientHeading text={"Approved Tuitions"}></GradientHeading>
          <p
            className="text-sm sm:text-base"
            style={{ color: "var(--color-text-muted)" }}
          >
            Browse and apply for approved tuition opportunities
          </p>
        </div>

        {/* Search Section */}
        <div
          className="rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 relative w-full">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--color-text-muted)" }}
                size={20}
              />
              <input
                type="text"
                placeholder="Search by subject, location, class, or student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10 transition-all focus:border-primary"
                style={{ backgroundColor: "var(--color-bg-soft)" }}
              />
            </div>

            {/* Results Count */}
            <div
              className="text-xs sm:text-sm whitespace-nowrap font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              Showing {filteredTuitions?.length || 0} of{" "}
              {tuitionData?.length || 0} tuitions
            </div>
          </div>
        </div>

        {/* Table Section */}
        {filteredTuitions && filteredTuitions.length > 0 ? (
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
                    <th style={{ color: "var(--color-text-dark)" }}>Tuto</th>
                    <th style={{ color: "var(--color-text-dark)" }}>Subject</th>
                    <th style={{ color: "var(--color-text-dark)" }}>Class</th>
                    <th style={{ color: "var(--color-text-dark)" }}>
                      Location
                    </th>
                    <th style={{ color: "var(--color-text-dark)" }}>Budget</th>
                    <th style={{ color: "var(--color-text-dark)" }}>Status</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {filteredTuitions.map((tuition, index) => (
                    <tr
                      key={tuition._id || index}
                      className="hover:bg-primary/5 transition-colors"
                    >
                      {/* Index */}
                      <th style={{ color: "var(--color-text-dark)" }}>
                        {index + 1}
                      </th>

                      {/* Student Info */}
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div
                              className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12 ring-2"
                              style={{ borderColor: "var(--color-primary)" }}
                            >
                              <img
                                src={
                                  tuition.studentPhoto ||
                                  "https://via.placeholder.com/150"
                                }
                                alt={tuition.studentName}
                              />
                            </div>
                          </div>
                          <div>
                            <div
                              className="font-bold text-sm sm:text-base"
                              style={{ color: "var(--color-text-dark)" }}
                            >
                              {tuition.studentName}
                            </div>
                            <div
                              className="text-xs sm:text-sm"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              {tuition.studentEmail}
                            </div>
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
                            {tuition.subject}
                          </span>
                        </div>
                      </td>

                      {/* Class */}
                      <td
                        className="text-sm sm:text-base"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {tuition.class}
                      </td>

                      {/* Location */}
                      <td>
                        <div className="flex items-center gap-2">
                          <FiMapPin
                            size={16}
                            style={{ color: "var(--color-secondary)" }}
                          />
                          <span
                            className="text-sm sm:text-base"
                            style={{ color: "var(--color-text-dark)" }}
                          >
                            {tuition.location}
                          </span>
                        </div>
                      </td>

                      {/* Budget */}
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
                            ৳{tuition.budget}
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
                          {tuition.status || "approved"}
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
              <FiSearch
                size={64}
                className="mb-4"
                style={{ color: "var(--color-text-muted)" }}
              />
              <h3
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: "var(--color-text-dark)" }}
              >
                No Approved Tuitions Found
              </h3>
              <p
                className="text-sm sm:text-base mb-6"
                style={{ color: "var(--color-text-muted)" }}
              >
                {searchTerm
                  ? "Try adjusting your search"
                  : "No approved tuitions available at the moment"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn text-white font-bold border-none"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                  }}
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTuitions;
