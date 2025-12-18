import { FiBookOpen, FiUsers } from "react-icons/fi";
import { Link } from "react-router";

const Call = () => {
  return (
    <div>
      {/* Call to Action */}
      <div
        className="rounded-xl shadow-lg p-8 mt-12 text-center border"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary-hover), var(--color-secondary-hover))",
          borderColor: "var(--color-border)",
        }}
      >
        <h3 className="text-2xl font-bold mb-4 text-white">
          Ready to Start Teaching?
        </h3>
        <p className="text-lg mb-6 text-white/90">
          Join thousands of tutors who have found their perfect students through
          our platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/all-tuitions"
            className="btn bg-orange-500 border-0 btn-outline btn-lg gap-2 text-white border-white hover:bg-white hover:text-primary"
          >
            <FiBookOpen size={20} />
            Browse All Tuitions
          </Link>
          <Link
            to="/register"
            className="btn bg-orange-500 border-0 btn-lg gap-2 hover:bg-white text-primary hover:scale-105 transition-transform border-none"
          >
            <FiUsers size={20} />
            Join as Tutor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Call;
