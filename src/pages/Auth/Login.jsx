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
      toast.error("Login failed");
      return null;
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    signInFunc(data.email, data.password)
      .then(async (userCredential) => {
        toast.success("Login Successful");
        const role = await getJWTAndRole(userCredential.user);
        if (role === "admin") navigate("/dashboard/user-management");
        else if (role === "tutor") navigate("/dashboard/active-tuitions");
        else navigate("/dashboard/my-tuitions");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Invalid email or password");
      })
      .finally(() => setIsLoading(false));
  };

  const handleGoogle = () => {
    setIsLoading(true);
    signInWithGoogleFunc()
      .then(async (userCredential) => {
        toast.success("Google Login Successful");
        const role = await getJWTAndRole(userCredential.user);
        if (role === "admin") navigate("/dashboard/user-management");
        else if (role === "tutor") navigate("/dashboard/active-tuitions");
        else navigate("/dashboard/my-tuitions");
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
