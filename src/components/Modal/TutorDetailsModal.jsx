import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../Shared/Spinner";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBook,
  FiAward,
  FiDollarSign,
  FiCalendar,
  FiStar,
  FiMessageCircle,
} from "react-icons/fi";

const TutorDetailsModal = ({ id, onClose }) => {
  const axiosSecure = useAxiosSecure();

  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutorDetailsModal", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;
  console.log(tutor);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-9999 backdrop-blur-md transition-all duration-300 ease-out"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-10000 flex items-center justify-center p-3 sm:p-6">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[96vh] overflow-hidden transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-blue-800 text-white p-4 sm:p-6 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <FiUser size={20} className="sm:text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Tutor Profile
                  </h2>
                  <p className="opacity-90 text-sm sm:text-base">
                    Complete information & details
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <FiX size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="overflow-y-auto max-h-[calc(96vh-120px)]">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-6 sm:space-y-8">
                {/* Profile Header */}
                <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 border border-blue-100">
                  <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
                    {/* Profile Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-4 ring-blue-200 shadow-xl">
                        <img
                          src={
                            tutor?.tutorImage ||
                            tutor?.photo ||
                            "https://via.placeholder.com/150/4F46E5/FFFFFF?text=Tutor"
                          }
                          alt={tutor?.tutorName || tutor?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                        <FiStar size={16} />
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                        {tutor?.tutorName || tutor?.name || "Tutor Name"}
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 text-sm sm:text-base">
                        <div className="flex items-center gap-2 text-gray-600 justify-center lg:justify-start">
                          <FiMail size={16} />
                          <span className="break-all">
                            {tutor?.tutorEmail || tutor?.email}
                          </span>
                        </div>
                        {tutor?.phone && (
                          <div className="flex items-center gap-2 text-gray-600 justify-center lg:justify-start">
                            <FiPhone size={16} />
                            <span>{tutor.phone}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        <span className="badge badge-primary badge-lg gap-2 px-4 py-2">
                          <span>{tutor?.qualification || "Qualified"}</span>
                        </span>
                        <span className="badge badge-secondary badge-lg gap-2 px-4 py-2">
                          <FiBook size={14} />
                          <span>
                            {tutor?.tuitionSubject ||
                              tutor?.subject ||
                              "Expert"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Academic Information */}
                  <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <FiAward className="text-blue-600" size={20} />
                      </div>
                      Academic Information
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <label className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                          Qualification
                        </label>
                        <p className="text-base text-gray-800 font-medium mt-1">
                          {tutor?.qualification || "Not specified"}
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <label className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                          Subject Expertise
                        </label>
                        <p className="text-base text-gray-800 font-medium mt-1">
                          {tutor?.tuitionSubject ||
                            tutor?.subject ||
                            "Not specified"}
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <label className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                          Experience
                        </label>
                        <p className="text-base text-gray-800 font-medium mt-1">
                          {tutor?.experience
                            ? `${tutor.experience} years`
                            : "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact & Location */}
                  <div className="bg-white border-2 border-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <FiMapPin className="text-green-600" size={20} />
                      </div>
                      Contact Information
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-xl">
                        <label className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                          Email Address
                        </label>
                        <p className="text-base text-gray-800 font-medium mt-1 break-all">
                          {tutor?.tutorEmail || tutor?.email}
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl">
                        <label className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                          Phone Number
                        </label>
                        <p className="text-base text-gray-800 font-medium mt-1">
                          {tutor?.phone || "Not provided"}
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl">
                        <label className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                          Location
                        </label>
                        <p className="text-base text-gray-800 font-medium mt-1">
                          {tutor?.location || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tuition Details */}
                  <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <FiBook className="text-purple-600" size={20} />
                      </div>
                      Tuition Details
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded-xl">
                        <label className="text-sm font-semibold text-purple-700 uppercase tracking-wide">
                          Monthly Salary
                        </label>
                        <div className="flex items-center gap-2 mt-2">
                          <FiDollarSign className="text-green-500" size={20} />
                          <span className="text-2xl font-bold text-green-600">
                            ৳{tutor?.salary || "Not specified"}
                          </span>
                          <span className="text-sm text-gray-500">/month</span>
                        </div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-xl">
                        <label className="text-sm font-semibold text-purple-700 uppercase tracking-wide">
                          Class/Grade
                        </label>
                        <p className="text-base text-gray-800 font-medium mt-1">
                          {tutor?.class || tutor?.grade || "Not specified"}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-xl">
                        <label className="text-sm font-semibold text-purple-700 uppercase tracking-wide">
                          Schedule
                        </label>
                        <p className="text-base text-gray-800 font-medium mt-1">
                          {tutor?.schedule || "Flexible"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-white border-2 border-orange-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                        <FiCalendar className="text-orange-600" size={20} />
                      </div>
                      Additional Information
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-orange-50 rounded-xl">
                        <label className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                          Availability
                        </label>
                        <p className="text-base text-gray-800 font-medium mt-1">
                          {tutor?.availability || "Available"}
                        </p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-xl">
                        <label className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                          Teaching Method
                        </label>
                        <p className="text-base text-gray-800 font-medium mt-1">
                          {tutor?.teachingMethod || "Interactive Learning"}
                        </p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-xl">
                        <label className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                          Rating
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                size={16}
                                className="fill-current"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">(4.8/5)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 sticky bottom-0">
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  onClick={onClose}
                  className=" btn bg-orange-500 border-0 btn-lg gap-2 hover:bg-white text-primary hover:scale-105 transition-transform border-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorDetailsModal;
