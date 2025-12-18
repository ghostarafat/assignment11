import {
  FiUser,
  FiMail,
  FiShield,
  FiCalendar,
  FiPhone,
  FiMapPin,
  FiX,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

const UserDetails = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

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

  // Get role color
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "badge-error";
      case "tutor":
        return "badge-primary";
      default:
        return "badge-success";
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
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
            User Details
          </h3>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost hover:scale-105 transition-transform"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* User Profile Section */}
        <div
          className="rounded-xl shadow-lg p-6 mb-6 border"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="avatar">
              <div
                className="mask mask-squircle h-24 w-24 ring-4"
                style={{ borderColor: "var(--color-primary)" }}
              >
                <img
                  src={
                    user.image ||
                    user.photo ||
                    `https://ui-avatars.com/api/?name=${user.name}&background=random&size=200`
                  }
                  alt={user.name}
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--color-text-dark)" }}
              >
                {user.name}
              </h2>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                <span className={`badge gap-1 ${getRoleColor(user.role)}`}>
                  <FiShield size={14} />
                  {user.role || "student"}
                </span>
                <span className="badge badge-success gap-1">
                  <FiCheckCircle size={14} />
                  Active
                </span>
              </div>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                User ID: {user._id}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div
          className="rounded-xl shadow-lg p-6 mb-6 border"
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
              Contact Information
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: "var(--color-bg-soft)" }}
            >
              <FiMail size={20} style={{ color: "var(--color-primary)" }} />
              <div>
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Email Address
                </p>
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {user.email}
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: "var(--color-bg-soft)" }}
            >
              <FiPhone size={20} style={{ color: "var(--color-secondary)" }} />
              <div>
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Phone Number
                </p>
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {user.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: "var(--color-bg-soft)" }}
            >
              <FiMapPin size={20} style={{ color: "var(--color-success)" }} />
              <div>
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Location
                </p>
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {user.location || user.address || "Not provided"}
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: "var(--color-bg-soft)" }}
            >
              <FiCalendar size={20} style={{ color: "var(--color-warning)" }} />
              <div>
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Member Since
                </p>
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {formatDate(user.created_at || user.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {(user.bio || user.qualification || user.experience) && (
          <div
            className="rounded-xl shadow-lg p-6 mb-6 border"
            style={{
              backgroundColor: "var(--color-card-bg)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-1 h-6 rounded-full"
                style={{ backgroundColor: "var(--color-secondary)" }}
              ></div>
              <h4
                className="text-lg font-bold"
                style={{ color: "var(--color-text-dark)" }}
              >
                Additional Information
              </h4>
            </div>

            <div className="space-y-4">
              {user.bio && (
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Bio
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {user.bio}
                  </p>
                </div>
              )}

              {user.qualification && (
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Qualification
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {user.qualification}
                  </p>
                </div>
              )}

              {user.experience && (
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Experience
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {user.experience}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Account Status */}
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
              style={{ backgroundColor: "var(--color-success)" }}
            ></div>
            <h4
              className="text-lg font-bold"
              style={{ color: "var(--color-text-dark)" }}
            >
              Account Status
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "var(--color-bg-soft)" }}
            >
              <FiCheckCircle
                size={24}
                className="mx-auto mb-2"
                style={{ color: "var(--color-success)" }}
              />
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Account Status
              </p>
              <p
                className="font-bold"
                style={{ color: "var(--color-success)" }}
              >
                Active
              </p>
            </div>

            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "var(--color-bg-soft)" }}
            >
              <FiClock
                size={24}
                className="mx-auto mb-2"
                style={{ color: "var(--color-primary)" }}
              />
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Last Login
              </p>
              <p
                className="font-bold text-sm"
                style={{ color: "var(--color-text-dark)" }}
              >
                {user.last_loggedIn ? formatDate(user.last_loggedIn) : "N/A"}
              </p>
            </div>

            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "var(--color-bg-soft)" }}
            >
              <FiUser
                size={24}
                className="mx-auto mb-2"
                style={{ color: "var(--color-secondary)" }}
              />
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Profile Complete
              </p>
              <p
                className="font-bold"
                style={{ color: "var(--color-text-dark)" }}
              >
                {user.email && user.name ? "100%" : "80%"}
              </p>
            </div>
          </div>
        </div>

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

export default UserDetails;
