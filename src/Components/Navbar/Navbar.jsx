import React, { useEffect,useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/Cart/CartProvider"; 
import useAuth from "../../Hooks/useAuth";
import axios from "axios";  
import { toast } from "react-hot-toast"; 
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Navbar = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logout } = useAuth();
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const { cart, cartCount, cartTotal, updateCart } = useCart(); 

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      // Fetch cart details
      const fetchCart = async () => {
          const response = await axiosSecure.get(`/cart/${user.email}`);
          const cartItems = response.data; 
          updateCart(cartItems);
      };
      
      fetchCart();

      // Fetch User Role
      const fetchUserRole = async () => {
        try {
          const response = await axiosSecure.get(`/users/${user.email}`);
          setRole(response.data.role); 
        } catch (error) {
          console.error("Failed to fetch user role", error);
        }
      };
      fetchUserRole();
    }
  }, [user, updateCart]);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-semibold px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-base-content hover:bg-primary hover:text-white"}`  
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `font-semibold px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-base-content hover:bg-primary hover:text-white"}`  
          }
        >
          Shop
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 lg:px-6 w-full shadow-md">
      <div className="container mx-auto navbar">
        {/* Left Side: Logo & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <a className="text-xl font-bold">
            Medic<span className="text-primary">aid</span>
          </a>
        </div>

        {/* Center: Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>

        {/* Right Side: Cart, Language, Profile/Join Us */}
        <div className="navbar-end flex items-center gap-4">
          {/* Cart Icon */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn hover:bg-secondary btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">{cartCount}</span>
              </div>
            </div>
            <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
              <div className="card-body">
                <span className="text-lg font-bold">{cartCount} Items</span>
                <span className="text-info">Subtotal: ${cartTotal}</span>
                <div className="card-actions">
                  <Link to="/cart" className="btn btn-primary btn-block">View Cart</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-secondary max-sm:hidden">
              🌍 Language
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow">
              <li><button>English</button></li>
              <li><button>বাংলা</button></li>
            </ul>
          </div>

          {/* Profile / Join Us Button */}
          {!user ? (
            <Link to="/register" className="btn btn-primary text-white ml-2">Join Us</Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-secondary btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt={user?.displayName} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">Update Profile</Link>
                </li>
                <li>
                <Link to={`/dashboard/${role}-home`}>Dashboard</Link>
                  </li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
