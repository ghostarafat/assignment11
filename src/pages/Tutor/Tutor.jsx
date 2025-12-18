import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Shared/Container";
import GradientHeading from "../../components/Shared/GradientHeading";
import Spinner from "../../components/Shared/Spinner";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiBook,
  FiAward,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import GradientButton from "../../components/Shared/GradientButton";
import TutorCard from "../../components/TutorCard";

const Tutor = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tutorData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-tutor"],
    queryFn: () =>
      axiosSecure
        .get(`${import.meta.env.VITE_API_URL}/tutors`)
        .then((res) => res.data),
  });

  const tutors = Array.isArray(tutorData) ? tutorData : [];

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return (
      <div
        className="min-h-screen py-8"
        style={{ backgroundColor: "var(--color-bg-soft)" }}
      >
        <Container>
          <div className="text-center py-20">
            <div
              className="alert alert-error max-w-md mx-auto rounded-xl shadow-lg"
              style={{
                backgroundColor: "var(--color-error-bg)",
                borderColor: "var(--color-error)",
              }}
            >
              <span>Error loading tutors: {error.message}</span>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8"
      style={{ backgroundColor: "var(--color-bg-soft)" }}
    >
      <Container>
        {/* Header Section */}
        <div className="text-center mb-12">
          <GradientHeading className="text-center mb-4" text="All Tutors" />
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: "var(--color-text-muted)" }}
          >
            Meet our qualified tutors! Browse through profiles of experienced
            educators ready to help students achieve their academic goals.
          </p>
        </div>

        {/* Tutors Grid */}
        {tutors.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor) => (
              <TutorCard tutor={tutor}></TutorCard>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20 rounded-xl shadow-lg border"
            style={{
              backgroundColor: "var(--color-card-bg)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="max-w-md mx-auto">
              <div
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-bg-soft)" }}
              >
                <FiUsers
                  size={32}
                  style={{ color: "var(--color-text-muted)" }}
                />
              </div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: "var(--color-text-dark)" }}
              >
                No tutors available
              </h3>
              <p
                className="text-lg"
                style={{ color: "var(--color-text-muted)" }}
              >
                No tutors are currently registered. Check back later to see
                available tutors.
              </p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Tutor;
