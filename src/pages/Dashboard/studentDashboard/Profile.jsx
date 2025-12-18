import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { FiMail, FiUser, FiShield, FiCalendar, FiEdit2, FiSave, FiX, FiCamera } from "react-icons/fi";
import GradientHeading from "../../../components/Shared/GradientHeading";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { user, updateUserProfileFunc, setUser } = useAuth();
  const [role] = useRole();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
    // Set current values in form
    setValue("displayName", user?.displayName || "");
    setValue("photoURL", user?.photoURL || "");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    reset();
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Update Firebase profile
      await updateUserProfileFunc(data.displayName, data.photoURL);
      
      // Update local user state
      setUser({
        ...user,
        displayName: data.displayName,
        photoURL: data.photoURL,
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <GradientHeading text={"My Profile"}></GradientHeading>
          <p className="text-base-content/70">
            Manage your account information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card - Left Side */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-2xl">
              <div className="card-body items-center text-center p-8">
                {/* Profile Image */}
                <div className="relative">
                  <div className="avatar online">
                    <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img 
                        src={user?.photoURL || "https://via.placeholder.com/150/4F46E5/FFFFFF?text=User"} 
                        alt={user?.displayName || "User"} 
                        className="object-cover"
                      />
                    </div>
                  </div>
                  {!isEditing && (
                    <div className="absolute bottom-0 right-0 bg-primary text-primary-content rounded-full p-2 shadow-lg cursor-pointer hover:bg-primary/80 transition-colors">
                      <FiCamera size={16} />
                    </div>
                  )}
                </div>

                {/* User Name */}
                <h3 className="text-2xl font-bold mt-4">
                  {user?.displayName || "User"}
                </h3>

                {/* Role Badge */}
                <div className="badge badge-primary badge-lg gap-2 mt-2">
                  <FiShield size={14} />
                  {role || "User"}
                </div>

                {/* Email */}
                <p className="text-base-content/70 mt-2 flex items-center gap-2">
                  <FiMail size={16} />
                  {user?.email}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 w-full mt-6">
                  {!isEditing ? (
                    <button
                      onClick={handleEditClick}
                      className="w-full text-base btn text-white font-bold py-3 
                rounded-lg shadow-lg hover:shadow-xl transition-all
                 duration-300 hover:scale-[1.02] active:scale-95 border-none 
                 hover:opacity-70"
                      style={{
                        background:
                          "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                      }}
                    >
                      <FiEdit2 size={18} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isLoading}
                        className="flex-1 text-base btn text-white font-bold py-3 
                  rounded-lg shadow-lg hover:shadow-xl transition-all
                   duration-300 hover:scale-[1.02] active:scale-95 border-none 
                   hover:opacity-70 disabled:opacity-50"
                        style={{
                          background:
                            "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                        }}
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <>
                            <FiSave size={18} />
                            Save
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={isLoading}
                        className="btn btn-outline btn-error"
                      >
                        <FiX size={18} />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Account Created */}
                <div className="divider"></div>
                <div className="text-sm text-base-content/60 flex items-center gap-2">
                  <FiCalendar size={14} />
                  Member since {formatDate(user?.metadata?.creationTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details - Right Side */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-2xl">
              <div className="card-body p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FiUser size={24} />
                  Account Information
                </h3>

                {/* Information Grid */}
                <div className="space-y-6">
                  {/* Personal Information Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      <h4 className="text-lg font-semibold">
                        Personal Information
                      </h4>
                    </div>
                    <div className="bg-linear-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/10">
                      {!isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm font-semibold text-base-content/70">
                              Full Name
                            </label>
                            <p className="text-lg font-medium mt-1">
                              {user?.displayName || "Not provided"}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-base-content/70">
                              Email Address
                            </label>
                            <p className="text-lg font-medium mt-1">
                              {user?.email}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-base-content/70">
                              Phone Number
                            </label>
                            <p className="text-lg font-medium mt-1">
                              {user?.phoneNumber || "Not provided"}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-base-content/70">
                              User ID
                            </label>
                            <p className="text-lg font-medium mt-1 truncate">
                              {user?.uid?.substring(0, 20)}...
                            </p>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name Input */}
                            <div className="md:col-span-2">
                              <label className="text-sm font-semibold text-base-content/70 block mb-2">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                {...register("displayName", {
                                  required: "Full name is required",
                                  minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters",
                                  },
                                  maxLength: {
                                    value: 50,
                                    message: "Name must be less than 50 characters",
                                  },
                                })}
                                className={`input input-bordered w-full ${
                                  errors.displayName ? "input-error" : ""
                                }`}
                                placeholder="Enter your full name"
                              />
                              {errors.displayName && (
                                <p className="text-error text-sm mt-1">
                                  {errors.displayName.message}
                                </p>
                              )}
                            </div>

                            {/* Photo URL Input */}
                            <div className="md:col-span-2">
                              <label className="text-sm font-semibold text-base-content/70 block mb-2">
                                Profile Photo URL
                              </label>
                              <input
                                type="url"
                                {...register("photoURL", {
                                  pattern: {
                                    value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                                    message: "Please enter a valid image URL (jpg, jpeg, png, gif, webp)",
                                  },
                                })}
                                className={`input input-bordered w-full ${
                                  errors.photoURL ? "input-error" : ""
                                }`}
                                placeholder="https://example.com/your-photo.jpg"
                              />
                              {errors.photoURL && (
                                <p className="text-error text-sm mt-1">
                                  {errors.photoURL.message}
                                </p>
                              )}
                              <p className="text-xs text-base-content/60 mt-1">
                                Enter a direct link to your profile image
                              </p>
                            </div>

                            {/* Read-only fields */}
                            <div>
                              <label className="text-sm font-semibold text-base-content/70">
                                Email Address
                              </label>
                              <p className="text-lg font-medium mt-1 text-base-content/60">
                                {user?.email} (Cannot be changed)
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-base-content/70">
                                User ID
                              </label>
                              <p className="text-lg font-medium mt-1 truncate text-base-content/60">
                                {user?.uid?.substring(0, 20)}...
                              </p>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* Account Status Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-secondary rounded-full"></div>
                      <h4 className="text-lg font-semibold">Account Status</h4>
                    </div>
                    <div className="bg-linear-to-br from-secondary/5 to-accent/5 p-6 rounded-xl border border-secondary/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Email Verification
                          </label>
                          <div className="mt-2">
                            {user?.emailVerified ? (
                              <span className="badge badge-success gap-2">
                                ✓ Verified
                              </span>
                            ) : (
                              <span className="badge badge-warning gap-2">
                                ⚠ Not Verified
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Account Role
                          </label>
                          <div className="mt-2">
                            <span className="badge badge-primary badge-lg">
                              {role || "User"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Account Created
                          </label>
                          <p className="text-lg font-medium mt-1">
                            {formatDate(user?.metadata?.creationTime)}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Last Sign In
                          </label>
                          <p className="text-lg font-medium mt-1">
                            {formatDate(user?.metadata?.lastSignInTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Provider Information */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-accent rounded-full"></div>
                      <h4 className="text-lg font-semibold">
                        Authentication Provider
                      </h4>
                    </div>
                    <div className="bg-linear-to-br from-accent/5 to-primary/5 p-6 rounded-xl border border-accent/10">
                      <div className="flex items-center gap-4">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-full w-12">
                            <span className="text-xl">
                              {user?.providerData?.[0]?.providerId
                                ?.charAt(0)
                                .toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-base-content/70">
                            Sign-in Method
                          </label>
                          <p className="text-lg font-medium capitalize">
                            {user?.providerData?.[0]?.providerId?.replace(
                              ".com",
                              ""
                            ) || "Email"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
