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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // ---------------- JWT + Role ----------------
  const getJWTAndRole = async (firebaseUser) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: firebaseUser.email }),
      });

      if (!res.ok) throw new Error("Failed to fetch JWT");
      const { token } = await res.json();
      localStorage.setItem("eduPlusToken", token);

      const roleRes = await fetch(`${import.meta.env.VITE_API_URL}/user/role`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!roleRes.ok) throw new Error("Failed to fetch role");
      const { role } = await roleRes.json();
      return role;
    } catch (err) {
      console.error("JWT/Role error:", err);
      return null;
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { name, image, email, role, password } = data;

      // Default placeholder if no image
      let photoURL = "https://i.ibb.co/ypkgK0X/placeholder.png";
      if (image && image.length > 0) {
        const imageFile = image[0];
        photoURL = await imageUpload(imageFile);
      }

      // Firebase create + profile update
      await createUserFunc(email, password);
      await updateUserProfileFunc(name, photoURL);

      // Save user to backend
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name,
        image: photoURL,
        email,
        role,
      });

      toast.success("Signup Successful");

      // JWT fetch + role-based redirect
      const userRole = await getJWTAndRole({ email });
      if (userRole === "admin") navigate("/dashboard/user-management");
      else if (userRole === "tutor") navigate("/dashboard/active-tuitions");
      else navigate("/dashboard/my-tuitions");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Create Account
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Join our learning community today
          </p>
        </div>

        <div className="rounded-2xl shadow-2xl p-6 sm:p-8 border bg-white border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
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
                  />
                  <span className="text-sm font-medium">Student</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    className="radio radio-primary"
                    value="tutor"
                    {...register("role", { required: "Please select a role" })}
                  />
                  <span className="text-sm font-medium">Teacher</span>
                </label>
              </div>
              {errors.role && (
                <p className="text-error text-xs mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={`input input-bordered w-full pl-10 ${
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className={`input input-bordered w-full pl-10 ${
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
              <label className="block text-sm font-medium mb-2">
                Profile Image
              </label>
              <div>
                <label
                  htmlFor="image"
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5"
                >
                  <FaImage className="mr-2 text-gray-400" size={18} />
                  <span className="text-sm text-gray-500">
                    Choose profile picture (optional)
                  </span>
                  <input
                    name="image"
                    type="file"
                    id="image"
                    accept="image/*"
                    className="hidden"
                    {...register("image")}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <FaLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className={`input input-bordered w-full pl-10 pr-12 ${
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
                        "Password must contain uppercase and lowercase letters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 border-none disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-indigo-500"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
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
