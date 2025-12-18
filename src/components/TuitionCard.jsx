import { FiBookOpen, FiMapPin, FiDollarSign, FiCalendar } from "react-icons/fi";
import { Link } from "react-router";
import { MdOutlineDoubleArrow } from "react-icons/md";
const TuitionCard = ({ tuition }) => {
  const {
    subject,
    class: tuitionClass,
    location,
    budget,

    created_at,
  } = tuition;

  const formatDate = (date) => {
    if (!date) return "Recently";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="card-body p-6">
        {/* Header with Status Badge */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="card-title text-2xl font-bold line-clamp-1 text-primary">
              {subject}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-base-content/70">
              <FiCalendar size={14} />
              <span className="text-sm">Posted {formatDate(created_at)}</span>
            </div>
          </div>
        </div>

        {/* Tuition Details */}
        <div className="space-y-3 mb-4">
          {/* Class/Grade */}
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
            <div className="bg-primary/20 p-2 rounded-lg">
              <FiBookOpen className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-xs text-base-content/60 font-semibold">
                Class/Grade
              </p>
              <p className="font-semibold line-clamp-1 text-base">
                {tuitionClass}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
            <div className="bg-secondary/20 p-2 rounded-lg">
              <FiMapPin className="text-secondary" size={20} />
            </div>
            <div>
              <p className="text-xs text-base-content/60 font-semibold">
                Location
              </p>
              <p className="font-semibold line-clamp-1 text-base">{location}</p>
            </div>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
            <div className="bg-accent/20 p-2 rounded-lg">
              <FiDollarSign className="text-accent" size={20} />
            </div>
            <div>
              <p className="text-xs text-base-content/60 font-semibold">
                Budget (per month)
              </p>
              <p className="font-bold line-clamp-1 text-lg text-accent">
                ৳{budget}
              </p>
            </div>
          </div>
        </div>

        <div className="divider my-2"></div>

        {/* Student Information */}
        <div className="flex items-center justify-between">
          {/* Action Button */}

          <Link
            to={`/tuitions-details/${tuition._id}`}
            className="w-full text-base btn text-white font-bold py-3 
            rounded-lg shadow-lg hover:shadow-xl transition-all
             duration-300 hover:scale-[1.02] active:scale-95 border-none 
             hover:opacity-70 "
            style={{
              background:
                "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
            }}
          >
            see more <MdOutlineDoubleArrow />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TuitionCard;
