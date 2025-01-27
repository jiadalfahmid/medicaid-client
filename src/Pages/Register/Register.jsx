import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";
import useHelmet from "./../../Hooks/useHelmet";

const Register = () => {
  const axiosPublic = useAxiosPublic();
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
  const [imageUrl, setImageUrl] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
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
        setImageUrl(data.data.url);
      }
    } catch (error) {
      console.error("Image upload failed", error);
      setError("Image upload failed. Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
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
      await signUp(name, email, password, imageUrl);
      const userInfo = {
        name: name,
        email: email,
        role: "user",
        photo: imageUrl,
      };
      await axiosPublic.post("/users", userInfo);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User created successfully.",
        showConfirmButton: false,
        timer: 3000,
      });
      setSuccess("Registration successful! Redirecting...");
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
          <button
            onClick={signUpWithGoogle}
            className="btn btn-outline text-primary border-primary w-full hover:bg-primary hover:text-white"
            disabled={loading}
          >
            <FaGoogle /> Sign up with Google
          </button>
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

          <div className="">
            <label className="label">
              <span className="label-text text-base-content">Upload Photo</span>
            </label>
            <input
              type="file"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className=""
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
              disabled={loading || !imageUrl}
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
