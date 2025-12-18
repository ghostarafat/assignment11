import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInFunc, signInWithGoogleFunc } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const onSubmit = async (data) => {
    const { email, password } = data;

    setIsLoading(true);
    try {
      const { user } = await signInFunc(email, password);
    
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      // console.log(err);
      toast.error(err?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithGoogleFunc();
      const loggedUser = result.user;

      // backend এ POST করে user save/last_loggedIn update
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: loggedUser.displayName,
          email: loggedUser.email,
          // role না path korle backend default student assign korbe
        }),
      });

      await res.json();

      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
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
            Welcome Back
          </h2>
          <p
            className="text-sm sm:text-base"
            style={{ color: "var(--color-text-muted)" }}
          >
            Sign in to continue your learning journey
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
                  className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-gray-400"
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
                  className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`input input-bordered w-full pl-10 pr-12 transition-all ${
                    errors.password ? "input-error" : "focus:border-primary"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-50 right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash className="z-50" size={18} />
                  ) : (
                    <FaEye className="" size={18} />
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
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold hover:underline transition-all"
                style={{ color: "var(--color-primary)" }}
              >
                Create Account
              </Link>
            </p>
            {/* Divider */}
            <div className="flex items-center my-6">
              <div 
                className="flex-1 h-px" 
                style={{ backgroundColor: "var(--color-border)" }}
              ></div>
              <span 
                className="px-4 text-sm font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Or continue with
              </span>
              <div 
                className="flex-1 h-px" 
                style={{ backgroundColor: "var(--color-border)" }}
              ></div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogle}
              disabled={isLoading}
              className="w-full btn bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 font-medium py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <svg
                  aria-label="Google logo"
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
              )}
              <span className="text-base">
                {isLoading ? "Signing in..." : "Continue with Google"}
              </span>
            </button>

            {/* Student Note */}
            <p 
              className="text-xs text-center mt-3 italic"
              style={{ color: "var(--color-text-muted)" }}
            >
              * New users will be registered as students by default
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
