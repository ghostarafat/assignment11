import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-600 mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            The page you're looking for doesn't exist or has been moved. Don't
            worry, let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-orange-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-colors duration-200 shadow-lg"
          >
            <FaHome className="mr-2 text-lg" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200 border-2 border-gray-200"
          >
            <FaArrowLeft className="mr-2 text-lg" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/all-tuitions"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
            >
              Browse Tuitions
            </Link>
            <Link
              to="/tutor"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
            >
              Find Tutors
            </Link>
            <Link
              to="/about"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          <div className="w-2 h-2 bg-orange-900 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Error;
