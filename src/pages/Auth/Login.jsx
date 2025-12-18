import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthContext";

function Login() {
  const { signInFunc, signInWithGoogleFunc } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ROLE BASED REDIRECt
  const redirectBasedOnRole = async (user) => {
    try {
      const token = await user.getIdToken();

      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/role`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch role");
      }

      const data = await res.json();

      if (data.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else if (data.role === "teacher") {
        navigate("/teacher-dashboard", { replace: true });
      } else {
        navigate("/student-dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Role fetch error:", err);
      toast.error("Failed to get user role");
      navigate(from, { replace: true });
    }
  };

  //  EMAIL / PASSWORD LOGIN
  const onSubmit = (data) => {
    setIsLoading(true);
    signInFunc(data.email, data.password)
      .then(async (userCredential) => {
        toast.success("Login Successful");
        await redirectBasedOnRole(userCredential.user);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Invalid email or password");
      })
      .finally(() => setIsLoading(false));
  };

  // GOOGLE LOGIN
  const handleGoogle = () => {
    setIsLoading(true);
    signInWithGoogleFunc()
      .then(async (userCredential) => {
        toast.success("Google Login Successful");
        await redirectBasedOnRole(userCredential.user);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google login failed");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered w-full pl-10"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full pl-10 pr-12"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  Password is required
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn w-full bg-blue-600 text-white"
            >
              {isLoading ? "Signing In..." : "Login"}
            </button>
          </form>

          <button
            onClick={handleGoogle}
            disabled={isLoading}
            className="btn w-full mt-4 bg-red-500 text-white"
          >
            Continue with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
