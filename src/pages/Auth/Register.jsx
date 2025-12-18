import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthContext";
import { imageUpload } from "../../utils";
import axios from "axios";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateUserProfileFunc, createUserFunc } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  // console.log(user);

  const onSubmit = async (data) => {
    const { name, image, email, role, password } = data;
    const imageFile = image[0];

    setIsLoading(true);
    try {
      const photoURL = await imageUpload(imageFile);
      const result = await createUserFunc(email, password);
      await updateUserProfileFunc(name, photoURL);

      axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name,
        image: photoURL,
        email,
        role,
      });

      navigate(from, { replace: true });
      toast.success("Signup Successfully");
      // console.log(result);
    } catch (err) {
      // console.log(err);
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-bg-soft)" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-2"
            style={{ color: "var(--color-text-dark)" }}
          >
            Create Account
          </h2>
          <p
            className="text-sm sm:text-base"
            style={{ color: "var(--color-text-muted)" }}
          >
            Join our learning community today
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl shadow-2xl p-6 sm:p-8 border"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Role Selection - Simple */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-text-dark)" }}
              >
                Register as
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    className="radio radio-primary"
                    value="student"
                    {...register("role", { required: "Please select a role" })}
                    defaultChecked
                    onChange={(e) => setSelectedRole(e.target.value)}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Student
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    className="radio radio-primary"
                    value="tutor"
                    {...register("role", { required: "Please select a role" })}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    Teacher
                  </span>
                </label>
              </div>
              {errors.role && (
                <p className="text-error text-xs mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Name Input */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-text-dark)" }}
              >
                Full Name
              </label>
              <div className="relative">
                <FaUser
                  className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={`input input-bordered w-full pl-10 transition-all ${
                    errors.name ? "input-error" : "focus:border-primary"
                  }`}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-error text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-text-dark)" }}
              >
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope
                  className="absolute z-10  left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className={`input input-bordered w-full pl-10 transition-all ${
                    errors.email ? "input-error" : "focus:border-primary"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-error text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-text-dark)" }}
              >
                Profile Image
              </label>
              <div className="relative">
                <label
                  htmlFor="image"
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-all hover:border-primary hover:bg-primary/5"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <FaImage className="mr-2 z-10  text-gray-400" size={18} />
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Choose profile picture
                  </span>
                  <input
                    name="image"
                    type="file"
                    id="image"
                    accept="image/*"
                    className="hidden"
                    {...register("image", { required: "Image is required" })}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>

            {/* Password Input */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-text-dark)" }}
              >
                Password
              </label>
              <div className="relative">
                <FaLock
                  className="absolute z-10  left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className={`input input-bordered w-full pl-10 pr-12 transition-all ${
                    errors.password ? "input-error" : "focus:border-primary"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])/,
                      message:
                        "Password must contain at least one uppercase and one lowercase letter",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-10  right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-error text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 border-none disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold hover:underline transition-all"
                style={{ color: "var(--color-primary)" }}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
