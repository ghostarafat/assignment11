import { Link } from "react-router";
import { FiStar, FiMapPin, FiAward, FiUser } from "react-icons/fi";

const LatestTutorCard = ({ tutor }) => {
  return (
    <Link
      to={`/tutors/${tutor._id}`}
      className="group w-full max-w-sm mx-auto overflow-hidden shadow-2xl rounded-3xl relative h-80 flex flex-col transition-all duration-300 hover:shadow-3xl hover:scale-105"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary-hover) 0%, var(--color-card-bg) 100%)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Top Image Section */}
      <div className="relative grow w-full h-3/5 overflow-hidden">
        {/* Profile Image */}
        <img
          src={tutor.image}
          alt={`${tutor.name} - Tutor Portrait`}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 85%, transparent 100%)",
          }}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-orange/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Bottom Section */}
      <div
        className="relative text-white pb-6 pt-8 mt-[-30px] z-20"
        style={{ backgroundColor: "var(--color-card-dark)" }}
      >
        {/* Content */}
        <div className="relative px-6 z-20">
          {/* Name and Role */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
              {tutor.name}
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <FiUser size={14} className="text-gray-400" />
              <p className="text-gray-400 text-sm font-medium tracking-wide">
                Professional Tutor
              </p>
            </div>
          </div>
        </div>
        {/* Enhanced Bottom Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue/80 via-orange/20 to-transparent pointer-events-none"></div>
        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>
    </Link>
  );
};

export default LatestTutorCard;
