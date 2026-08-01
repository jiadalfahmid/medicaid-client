import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import { toast } from 'react-hot-toast';
import useHelmet from './../../Hooks/useHelmet';
import MedLoader from "../../Components/MedLoader/MedLoader";

// Map Firebase error codes to friendly messages
const getFirebaseErrorMessage = (code) => {
  const messages = {
    'auth/user-not-found':    'No account found with this email. Please register first.',
    'auth/wrong-password':    'Incorrect password. Please try again.',
    'auth/invalid-credential':'Invalid email or password. Please check and try again.',
    'auth/invalid-email':     'Please enter a valid email address.',
    'auth/user-disabled':     'This account has been disabled. Contact support.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your connection and try again.',
  };
  return messages[code] || 'Login failed. Please try again.';
};

const Login = () => {
  const {
    login,
    setError,
    error,
    loading,
    signUpWithGoogle,
  } = UseAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setIsSubmitting(true);
    try {
      setError("");
      await login(email, password);
      toast.success("Welcome back! Redirecting...");
      navigate(from, { replace: true });
    } catch (err) {
      const message = getFirebaseErrorMessage(err.code);
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      setError("");
      await signUpWithGoogle();
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      const message = getFirebaseErrorMessage(err.code);
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !isSubmitting) return <MedLoader />;

  return (
    <div className="mx-auto min-h-screen flex-col-reverse flex lg:flex-row justify-center items-center my-6 px-4">
      {useHelmet("Login")}
      <div className="card bg-base-100 w-full max-w-md shadow-xl rounded-2xl border border-slate-100">
        <form onSubmit={handleSubmit} className="card-body p-8">
          <h2 className="text-center text-3xl font-bold text-slate-800 mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-slate-500 text-sm mb-6">Sign in to your Medicaid account</p>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline text-slate-700 border-slate-200 w-full hover:bg-slate-50 hover:border-slate-300 gap-2"
            disabled={isSubmitting}
          >
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>

          {/* OR Divider */}
          <div className="divider my-4 text-slate-400 text-xs">OR</div>

          {/* Email Field */}
          <div className="form-control mb-3">
            <label className="label pb-1">
              <span className="label-text text-slate-700 font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full focus:border-primary focus:outline-none"
              required
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div className="form-control mb-1 relative">
            <label className="label pb-1">
              <span className="label-text text-slate-700 font-medium">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full pr-12 focus:border-primary focus:outline-none"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-[3.1rem] text-lg text-slate-400 hover:text-slate-700 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <span>⚠</span> {error}
            </p>
          )}

          {/* Submit Button */}
          <div className="form-control mt-5">
            <button
              type="submit"
              className="btn bg-primary hover:bg-primary/90 text-white w-full rounded-xl shadow-md shadow-primary/20"
              disabled={isSubmitting}
            >
              {isSubmitting ? <span className="loading loading-spinner loading-sm" /> : "Sign In"}
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-slate-600 mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </form>
      </div>
      <div className="w-full max-w-sm lg:w-1/3 hidden lg:block">
        <img src="./login.png" alt="Login illustration" />
      </div>
    </div>
  );
};

export default Login;
