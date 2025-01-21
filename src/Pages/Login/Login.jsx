import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import { toast } from 'react-hot-toast';
import useHelmet from './../../Hooks/useHelmet';

const Login = () => {
  const {
    login,
    setError,
    error,
    loading,
    success,
    setSuccess,
    signUpWithGoogle,
  } = UseAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setError("");
      await login(email, password);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate(from);
      }, 3000);
    } catch (err) {
      setError(err.message);
      toast.error(`Login failed: ${err.message}`); 
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      setError("");
      await signUpWithGoogle();
      toast.success("Google login successful! Redirecting..."); 
      setTimeout(() => {
        navigate(from);
      }, 3000);
    } catch (err) {
      setError(err.message);
      toast.error(`Google login failed: ${err.message}`); 
      }
  };

  return (
    <div className="mx-auto min-h-screen flex-col-reverse flex lg:flex-row justify-center items-center my-6">
      {useHelmet("Login")}
      <div className="card bg-base-100 w-full max-w-md shadow-xl rounded-lg">
        <form onSubmit={handleSubmit} className="card-body p-6">
          <h2 className="text-center text-3xl font-bold text-base-content mb-6">
            Welcome Back!
          </h2>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline text-primary border-accent w-full hover:bg-accent hover:text-white hover:border-accent"
            disabled={loading}
          >
            <FaGoogle/> Login with Google
          </button>

          {/* OR Divider */}
          <div className="divider my-6 text-base-content ">OR</div>

          {/* Email Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-base-content">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control mb-4 relative">
            <label className="label">
              <span className="label-text text-base-content">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-12 text-lg text-base-content"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-primary hover:bg-accent text-white w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-base-content mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Join Now
            </Link>
          </p>
        </form>
      </div>
      <div className="w-1/3"><img src="./login.png" alt="Login" /></div>
    </div>
  );
};

export default Login;
