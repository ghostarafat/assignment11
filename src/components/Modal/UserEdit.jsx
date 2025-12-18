import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiX,
  FiSave,
  FiShield,
  FiCamera,
  FiUpload,
} from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UserEdit = ({ isOpen, onClose, user, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Populate form with user data when modal opens
  useEffect(() => {
    if (user && isOpen) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");

      setValue("role", user.role || "student");

      // Set image preview to current user image
      setImagePreview(user.image || user.photo || null);
      setImageFile(null);
    }
  }, [user, isOpen, setValue]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to ImgBB
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsUploading(true);

      let imageUrl = user.image || user.photo;

      // Upload new image if selected
      if (imageFile) {
        try {
          imageUrl = await uploadImage(imageFile);
        } catch (e) {
          toast.error("Failed to upload image. Please try again.");
          setIsUploading(false);
          return;
        }
      }

      const updateData = {
        name: data.name,
        email: data.email,

        role: data.role,

        image: imageUrl,
      };

      await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/users/${user._id}`,
        updateData
      );
      toast.success("User profile updated successfully!");
      refetch();
      onClose();
      reset();
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    reset();
    setImagePreview(null);
    setImageFile(null);
    setIsUploading(false);
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
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
            Edit User Profile
          </h3>
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost hover:scale-105 transition-transform"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Image Section */}
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
                Profile Image
              </h4>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Current Image Preview */}
              <div className="avatar">
                <div
                  className="mask mask-squircle h-24 w-24 ring-4"
                  style={{ borderColor: "var(--color-primary)" }}
                >
                  <img
                    src={
                      imagePreview ||
                      user?.image ||
                      user?.photo ||
                      `https://ui-avatars.com/api/?name=${user?.name}&background=random&size=200`
                    }
                    alt={user?.name}
                  />
                </div>
              </div>

              {/* Image Upload Controls */}
              <div className="flex-1">
                <div className="form-control">
                  <label className="label">
                    <span
                      className="label-text font-medium flex items-center gap-2"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      <FiCamera size={16} />
                      Change Profile Picture
                    </span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input file-input-bordered file-input-primary w-full"
                      style={{
                        backgroundColor: "var(--color-bg-soft)",
                        borderColor: "var(--color-border)",
                      }}
                    />
                    {imageFile && (
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(user?.image || user?.photo || null);
                        }}
                        className="btn btn-outline btn-sm"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information Section */}
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
                style={{ backgroundColor: "var(--color-primary)" }}
              ></div>
              <h4
                className="text-lg font-bold"
                style={{ color: "var(--color-text-dark)" }}
              >
                Basic Information
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span
                    className="label-text font-medium flex items-center gap-2"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    <FiUser size={16} />
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full"
                  style={{
                    backgroundColor: "var(--color-bg-soft)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-dark)",
                  }}
                />
                {errors.name && (
                  <span className="text-error text-sm mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span
                    className="label-text font-medium flex items-center gap-2"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    <FiMail size={16} />
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="input input-bordered w-full"
                  style={{
                    backgroundColor: "var(--color-bg-soft)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-dark)",
                  }}
                />
                {errors.email && (
                  <span className="text-error text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Role & Permissions Section */}
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
                style={{ backgroundColor: "var(--color-secondary)" }}
              ></div>
              <h4
                className="text-lg font-bold"
                style={{ color: "var(--color-text-dark)" }}
              >
                Role & Permissions
              </h4>
            </div>

            <div className="form-control">
              <label className="label">
                <span
                  className="label-text font-medium flex items-center gap-2"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  <FiShield size={16} />
                  User Role
                </span>
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                className="select select-bordered w-full"
                style={{
                  backgroundColor: "var(--color-bg-soft)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-dark)",
                }}
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <span className="text-error text-sm mt-1">
                  {errors.role.message}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-action">
            <button
              type="button"
              onClick={handleClose}
              className="btn bg-orange-500 border-0 btn-lg gap-2
                   hover:bg-white text-primary hover:scale-105 transition-transform border-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="btn text-white font-bold border-none flex items-center gap-2"
              style={{
                background:
                  "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                opacity: isUploading ? 0.7 : 1,
              }}
            >
              {isUploading ? (
                <>
                  <FiUpload size={16} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FiSave size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={handleClose}></div>
    </div>
  );
};

export default UserEdit;
