import { FiMail } from "react-icons/fi";
import GradientButton from "./Shared/GradientButton";

const TutorCard = ({ tutor }) => {
  return (
    <div
      key={tutor._id}
      className="rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 overflow-hidden group"
      style={{
        backgroundColor: "var(--color-card-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Tutor Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={tutor.image || "/default-avatar.png"}
          alt={tutor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{tutor.name}</h3>
          <p className="text-white/90 text-sm">{tutor.role || "Tutor"}</p>
        </div>
      </div>

      {/* Tutor Details */}
      <div className="p-6">
        {/* Contact Info */}
        <div className="space-y-3 mb-4">
          {tutor.email && (
            <div className="flex items-center gap-3">
              <FiMail size={16} style={{ color: "var(--color-primary)" }} />
              <span
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {tutor.email}
              </span>
            </div>
          )}

          {/* Contact Button */}
          <div className="mt-6">
            {" "}
            <GradientButton className={"w-full"} to={`/tutors/${tutor._id}`}>
              View Profile{" "}
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
