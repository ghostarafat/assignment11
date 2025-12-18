import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../components/Shared/Container";
import Spinner from "../../components/Shared/Spinner";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiBook,
  FiAward,
  FiMessageCircle,
  FiGlobe,
  FiClock,
} from "react-icons/fi";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TutorDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutorProfileDetails", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const handleTouch = () => {
    return toast(`This feature is progress`);
  };

  return (
    <div
      className="min-h-screen py-8"
      style={{ backgroundColor: "var(--color-bg-soft)" }}
    >
      <Container>
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex"
            style={{
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
            }}
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div
              className="rounded-xl shadow-lg border overflow-hidden sticky top-8"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              {/* Profile Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {tutor.name}
                  </h1>
                  <p className="text-white/90">{tutor.role || "Tutor"}</p>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6">
                {/* Contact Information */}
                <div className="space-y-4 mb-6">
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Contact Information
                  </h3>

                  {tutor.email && (
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: "var(--color-primary-hover)",
                        }}
                      >
                        <FiMail size={16} />
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--color-text-dark)" }}
                        >
                          Email
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {tutor.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {tutor.phone && (
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: "var(--color-success-hover)",
                        }}
                      >
                        <FiPhone
                          size={16}
                          style={{ color: "var(--color-success)" }}
                        />
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--color-text-dark)" }}
                        >
                          Phone
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {tutor.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  {tutor.location && (
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: "var(--color-warning-hover)",
                        }}
                      >
                        <FiMapPin
                          size={16}
                          style={{ color: "var(--color-warning)" }}
                        />
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--color-text-dark)" }}
                        >
                          Location
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {tutor.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div
              className="rounded-xl shadow-lg border p-6"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--color-text-dark)" }}
              >
                About <span className="text-orange-500">{tutor.name} </span>
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {tutor.bio ||
                  "This tutor hasn't added a bio yet. Contact them directly to learn more about their teaching experience and approach."}
              </p>
            </div>

            {/* Qualifications & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Qualifications */}
              <div
                className="rounded-xl shadow-lg border p-6"
                style={{
                  backgroundColor: "var(--color-card-bg)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-success-hover)" }}
                  >
                    <FiAward
                      size={20}
                      style={{ color: "var(--color-success)" }}
                    />
                  </div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Qualifications
                  </h3>
                </div>
                <p
                  className="text-lg"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {tutor.qualification || "Not specified"}
                </p>
              </div>

              {/* Experience */}
              <div
                className="rounded-xl shadow-lg border p-6"
                style={{
                  backgroundColor: "var(--color-card-bg)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-warning-hover)" }}
                  >
                    <FiClock
                      size={20}
                      style={{ color: "var(--color-warning)" }}
                    />
                  </div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Experience
                  </h3>
                </div>
                <p
                  className="text-lg"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {tutor.experience || "Not specified"}
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div
              className="rounded-xl shadow-lg border p-6"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "var(--color-text-dark)" }}
              >
                Additional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {tutor.last_loggedIn && (
                    <div className="flex items-center gap-3">
                      <FiClock
                        size={16}
                        style={{ color: "var(--color-primary)" }}
                      />
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--color-text-dark)" }}
                        >
                          Last Login
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {new Date(tutor.last_loggedIn).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <FiUser
                      size={16}
                      style={{ color: "var(--color-primary)" }}
                    />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        Account Status
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-success)" }}
                      >
                        Active Tutor
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FiBook
                      size={16}
                      style={{ color: "var(--color-primary)" }}
                    />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        Teaching Subjects
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Contact for details
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiGlobe
                      size={16}
                      style={{ color: "var(--color-primary)" }}
                    />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        Availability
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Contact for schedule
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div
              className="rounded-xl shadow-lg border p-6"
              style={{
                backgroundColor: "var(--color-primary)",
              }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-black mb-2">
                  Ready to Start Learning?
                </h3>
                <p className="mb-4 text-gray-900">
                  Contact {tutor.name} to discuss your learning goals and
                  schedule a session.
                </p>
                <button
                  onClick={() => handleTouch()}
                  className={`font-bold btn rounded-lg shadow-lg  transition-all duration-300 
        hover:scale-105 hover:shadow-xl 
        active:scale-95 `}
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                    color: "var(--color-text-light)",
                  }}
                >
                  <FiMessageCircle size={16} />
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TutorDetails;
