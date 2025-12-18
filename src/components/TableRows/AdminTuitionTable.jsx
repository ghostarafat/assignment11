import { useState } from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AdminViewTuitionDetails from "../Modal/AdminViewTuitionDetails";
import toast from "react-hot-toast";

const AdminTuitionTable = ({ data, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [selectedTuitionId, setSelectedTuitionId] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleApprove = async ({ id, status }) => {
    try {
      await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/tuition-status/${id}`,
        { status }
      );
      refetch();
      toast.success(`Tuition ${status} updated successfully!`);
    } catch (error) {
      toast.error("Failed to update tuition status");
      console.error(error);
    }
  };

  const handleReject = async ({ id, status }) => {
    try {
      await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/tuition-status/${id}`,
        { status }
      );
      refetch();
      toast.success(`Tuition ${status} updated successfully!`);
    } catch (error) {
      toast.error("Failed to update tuition status");
      console.error(error);
    }
  };

  const handleView = (tuitionId) => {
    setSelectedTuitionId(tuitionId);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedTuitionId(null);
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-2xl">
      <table className="table table-zebra bg-white">
        {/* Table Head */}
        <thead className="bg-primary">
          <tr>
            <th className="text-gray-900">#</th>
            <th className="text-gray-900">Student</th>
            <th className="text-gray-900">Subject</th>
            <th className="text-gray-900">Class</th>
            <th className="text-gray-900">Location</th>
            <th className="text-gray-900">Budget</th>
            <th className="text-gray-900">Status</th>
            <th className="text-gray-900">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data && data.length > 0 ? (
            data.map((tuition, index) => (
              <tr
                key={tuition._id || index}
                className="hover:bg-gray-100 transition-colors"
              >
                {/* Index */}
                <th className="text-gray-900">{index + 1}</th>

                {/* Student Info */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 ring-2 ring-blue-400">
                        <img
                          src={tuition.studentPhoto}
                          alt={tuition.studentName}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {tuition.studentName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {tuition.studentEmail}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Subject */}
                <td className="font-semibold text-gray-900">
                  {tuition.subject}
                </td>

                {/* Class */}
                <td className="text-gray-800">{tuition.class}</td>

                {/* Location */}
                <td className="text-gray-800">{tuition.location}</td>

                {/* Budget */}
                <td>
                  <span className="font-bold text-blue-600">
                    ৳{tuition.budget}
                  </span>
                  <span className="text-xs text-gray-600">/month</span>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`badge ${
                      tuition.status === "approved"
                        ? "badge-success"
                        : tuition.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {tuition.status || "pending"}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex gap-2">
                    {/* View Button */}
                    <button
                      onClick={() => handleView(tuition._id)}
                      className="btn btn-ghost btn-sm text-blue-600 hover:bg-blue-100"
                      title="View Details"
                    >
                      <FiEye size={18} />
                    </button>

                    {/* Approve Button */}
                    {tuition.status !== "approved" &&
                      tuition.status !== "rejected" && (
                        <button
                          onClick={() =>
                            handleApprove({
                              id: tuition._id,
                              status: "approved",
                            })
                          }
                          className="btn btn-ghost btn-sm text-green-600 hover:bg-green-100"
                          title="Approve"
                        >
                          <FiCheck size={18} />
                        </button>
                      )}

                    {/* Reject Button */}
                    {tuition.status !== "rejected" &&
                      tuition.status !== "approved" && (
                        <button
                          onClick={() =>
                            handleReject({
                              id: tuition._id,
                              status: "rejected",
                            })
                          }
                          className="btn btn-ghost btn-sm text-red-600 hover:bg-red-100"
                          title="Reject"
                        >
                          <FiX size={18} />
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-8 text-gray-600">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl">📚</span>
                  <p>No tuition requests found</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Tuition Details Modal */}
      <AdminViewTuitionDetails
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        tuitionId={selectedTuitionId}
      />
    </div>
  );
};

export default AdminTuitionTable;
