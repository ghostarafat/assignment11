import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FiSearch,
  FiEye,
  FiEdit,
  FiTrash2,
  FiMail,
  FiShield,
  FiCalendar,
  FiUsers,
} from "react-icons/fi";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Shared/Spinner";
import UserDetails from "../../../components/Modal/UserDetails";
import UserEdit from "../../../components/Modal/UserEdit";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import GradientHeading from "../../../components/Shared/GradientHeading";
import Error from "../../Error";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [isUserEditOpen, setIsUserEditOpen] = useState(false);

  const {
    data: userData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-Users"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/all-users`
      );
      return res.data;
    },
  });

  if (isLoading) return <Spinner></Spinner>;

  if (error) {
    return (
     <Error/>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsUserEditOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axiosSecure.delete(
        `${import.meta.env.VITE_API_URL}/users/${userId}`
      );
      toast.success("User deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const closeUserDetails = () => {
    setIsUserDetailsOpen(false);
    setSelectedUser(null);
  };

  const closeUserEdit = () => {
    setIsUserEditOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 text-center sm:mb-8">
        <GradientHeading text={" User Management"}></GradientHeading>
        <p
          className="text-sm text-center sm:text-base"
          style={{ color: "var(--color-text-muted)" }}
        >
          Manage all users in the system
        </p>
      </div>

      {/* Stats Card */}
      <div
        className="rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border"
        style={{
          backgroundColor: "var(--color-card-bg)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              Total Users
            </p>
            <p
              className="text-3xl sm:text-4xl font-bold mt-1"
              style={{ color: "var(--color-primary)" }}
            >
              {userData?.length || 0}
            </p>
          </div>
          <div
            className="p-4 rounded-full"
            style={{ backgroundColor: "var(--color-primary-hover)" }}
          >
            <FiUsers size={32} />
          </div>
        </div>
      </div>

      {/* Table Section */}

      <div
        className="rounded-xl shadow-2xl overflow-hidden border"
        style={{
          backgroundColor: "var(--color-card-bg)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="table">
            {/* Table Head */}
            <thead style={{ backgroundColor: "var(--color-primary-hover)" }}>
              <tr>
                <th style={{ color: "var(--color-text-dark)" }}>#</th>
                <th style={{ color: "var(--color-text-dark)" }}>User</th>
                <th style={{ color: "var(--color-text-dark)" }}>Email</th>
                <th style={{ color: "var(--color-text-dark)" }}>Role</th>
                <th style={{ color: "var(--color-text-dark)" }}>Joined Date</th>
                <th style={{ color: "var(--color-text-dark)" }}>Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {userData.map((user, index) => (
                <tr
                  key={user._id || index}
                  className="hover:bg-primary/5 transition-colors"
                >
                  {/* Index */}
                  <th style={{ color: "var(--color-text-dark)" }}>
                    {index + 1}
                  </th>

                  {/* User Info */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div
                          className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12 ring-2"
                          style={{ borderColor: "var(--color-primary)" }}
                        >
                          <img src={user.image} alt={user.name} />
                        </div>
                      </div>
                      <div>
                        <div
                          className="font-bold text-sm sm:text-base"
                          style={{ color: "var(--color-text-dark)" }}
                        >
                          {user.name}
                        </div>
                        <div
                          className="text-xs sm:text-sm"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          ID: {user._id || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td>
                    <div className="flex items-center gap-2">
                      <FiMail
                        size={14}
                        style={{ color: "var(--color-text-muted)" }}
                      />
                      <span
                        className="text-sm sm:text-base"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {user.email}
                      </span>
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    <div className="flex items-center gap-2">
                      <FiShield
                        size={16}
                        style={{
                          color:
                            user.role === "admin"
                              ? "var(--color-error)"
                              : user.role === "tutor"
                              ? "var(--color-primary)"
                              : "var(--color-success)",
                        }}
                      />
                      <span
                        className={`badge gap-1 text-xs sm:text-sm ${
                          user.role === "admin"
                            ? "badge-error"
                            : user.role === "tutor"
                            ? "badge-primary"
                            : "badge-success"
                        }`}
                      >
                        {user.role || "student"}
                      </span>
                    </div>
                  </td>

                  {/* Joined Date */}
                  <td>
                    <div className="flex items-center gap-2">
                      <FiCalendar
                        size={14}
                        style={{ color: "var(--color-text-muted)" }}
                      />
                      <span
                        className="text-xs sm:text-sm"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {formatDate(user.created_at)}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex gap-2">
                      {/* View Button */}
                      <button
                        onClick={() => handleView(user)}
                        className="btn btn-ghost btn-sm hover:scale-105 transition-transform"
                        style={{ color: "var(--color-primary)" }}
                        title="View Details"
                      >
                        <FiEye size={18} />
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(user)}
                        className="btn btn-ghost btn-sm text-warning hover:scale-105 transition-transform"
                        title="Edit User"
                      >
                        <FiEdit size={18} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-ghost btn-sm text-error hover:scale-105 transition-transform"
                        title="Delete User"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      <UserDetails
        isOpen={isUserDetailsOpen}
        onClose={closeUserDetails}
        user={selectedUser}
      />

      {/* User Edit Modal */}
      <UserEdit
        isOpen={isUserEditOpen}
        onClose={closeUserEdit}
        user={selectedUser}
        refetch={refetch}
      />
    </div>
  );
};

export default UserManagement;
