import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import useHelmet from "./../../Hooks/useHelmet";
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const {
    signUp,
    error,
    loading,
    setError,
    setSuccess,
    success,
    signUpWithGoogle,
  } = UseAuth();
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!validatePassword(password)) {
      setError(
        "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    try {
      setError("");
      setSuccess("");
      await signUp(name, email, password, photo);
      setSuccess("Registration successful! Redirecting...");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signUpWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto min-h-screen flex gap-8 max-sm:flex-col-reverse justify-center items-center py-12">
      {useHelmet("Register")}
      <div className="w-1/3">
        <img src="./register.png" alt="Register" />
      </div>
      <div className="card bg-base-100 w-full max-w-md shadow-xl rounded-lg">
        <form onSubmit={handleSubmit} className="card-body p-6">
        {/* google signUp */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline text-primary border-primary w-full hover:bg-primary hover:text-white"
          disabled={loading}
        >
         <FaGoogle/> Sign up with Google
        </button>
        {/* or divider */}
        <div className="divider my-6 text-base-content">OR</div>
          <h2 className="text-center text-3xl font-bold text-base-content mb-6">
            Create Your Account
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-base-content">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-base-content">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full"
              required
            />
          </div>

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

          <div className="form-control mb-6 relative">
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

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-primary hover:bg-accent text-white w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>

          <p className="text-center text-base-content mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
