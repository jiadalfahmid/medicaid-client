import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/Cart/CartProvider";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { ShoppingCart, Menu, Globe, User, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logout } = useAuth();
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const { cart, cartCount, cartTotal, updateCart, fetchAndSyncCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // A4: Sync cart + role whenever user changes
  useEffect(() => {
    if (user?.email) {
      fetchAndSyncCart(user.email);
      const fetchUserRole = async () => {
        try {
          const response = await axiosSecure.get(`/users/${user.email}`);
          setRole(response.data.role);
        } catch (error) {
          console.error("Failed to fetch user role", error);
        }
      };
      fetchUserRole();
    } else {
      updateCart([]);
      setRole(null);
    }
  }, [user]);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium px-4 py-2 rounded-full transition-all duration-200 ${
              isActive
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-600 hover:bg-primary/10 hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `font-medium px-4 py-2 rounded-full transition-all duration-200 ${
              isActive
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-600 hover:bg-primary/10 hover:text-primary"
            }`
          }
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `font-medium px-4 py-2 rounded-full transition-all duration-200 ${
              isActive
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-600 hover:bg-primary/10 hover:text-primary"
            }`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `font-medium px-4 py-2 rounded-full transition-all duration-200 ${
              isActive
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-600 hover:bg-primary/10 hover:text-primary"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className={`navbar sticky top-0 z-50 lg:px-6 w-full transition-all duration-300 ${scrolled ? 'glass-nav py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto">
        {/* Left Side: Logo & Mobile Menu */}
        <div className="navbar-start flex items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" aria-label="Toggle mobile menu" className="btn btn-ghost lg:hidden min-w-[44px] min-h-[44px] mr-2">
              <Menu size={24} className="text-slate-700" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-2xl z-50 mt-3 w-56 p-4 shadow-hover border border-slate-100 gap-2"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-heading font-bold tracking-tight text-slate-800 flex items-center gap-2">
            <img src="/favicon.png" alt="Logo" className="w-8 h-8 object-contain" />
            Medic<span className="text-primary">aid</span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>

        {/* Right Side: Cart, Language, Profile/Join Us */}
        <div className="navbar-end flex items-center gap-3">
          {/* Cart Icon */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open cart"
              className="btn btn-ghost btn-circle hover:bg-primary/10 min-w-[44px] min-h-[44px] transition-colors"
            >
              <div className="indicator">
                <ShoppingCart size={22} className="text-slate-700" />
                {cartCount > 0 && (
                  <span className="badge badge-sm badge-primary indicator-item border-white">{cartCount}</span>
                )}
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-white z-50 mt-4 w-64 shadow-hover border border-slate-100 rounded-2xl"
            >
              <div className="card-body">
                {user ? (
                  <>
                    <h4 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">{cartCount} Items in Cart</h4>
                    <div className="flex justify-between items-center py-2 text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-bold text-primary">${cartTotal}</span>
                    </div>
                    <div className="card-actions mt-2">
                      <Link to="/cart" className="btn btn-primary btn-block rounded-xl shadow-md shadow-primary/20">
                        View Cart
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Your Cart</h4>
                    <p className="text-sm text-slate-500 py-2">Please log in to view your cart and checkout.</p>
                    <div className="card-actions mt-2">
                      <Link to="/login" className="btn btn-primary btn-block rounded-xl shadow-md shadow-primary/20">
                        Login to Shop
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="dropdown dropdown-end hidden sm:block">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost hover:bg-primary/10 rounded-full font-medium text-slate-600 px-4"
            >
              <Globe size={18} className="mr-2" /> Language
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-2xl z-50 mt-4 w-40 p-2 shadow-hover border border-slate-100"
            >
              <li><button className="hover:bg-slate-50 text-slate-700 font-medium rounded-lg">English</button></li>
              <li><button className="hover:bg-slate-50 text-slate-700 font-medium rounded-lg">বাংলা</button></li>
            </ul>
          </div>

          {/* A3: Login + Join Us for guests */}
          {!user ? (
            <div className="flex items-center gap-2 ml-2">
              <Link to="/login" className="btn btn-ghost border border-slate-200 hover:border-primary hover:text-primary rounded-full px-5 text-slate-700 transition-all">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary text-white rounded-full px-5 shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-transform">
                Join Us
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end ml-2">
              <div
                tabIndex={0}
                role="button"
                aria-label="User profile menu"
                className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/30 transition-all min-w-[44px] min-h-[44px]"
              >
                <div className="w-10 rounded-full border-2 border-white shadow-sm">
                  <img src={user?.photoURL || "https://i.ibb.co/M9XfF2M/default-avatar.png"} alt={user?.displayName || "User"} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-2xl z-50 mt-4 w-56 p-3 shadow-hover border border-slate-100 gap-1"
              >
                <li className="px-4 py-2 border-b border-slate-100 mb-2">
                  <div className="flex flex-col gap-0.5 pointer-events-none">
                    <span className="font-bold text-slate-800">{user?.displayName || "User"}</span>
                    <span className="text-xs text-slate-500">{user?.email}</span>
                  </div>
                </li>
                <li>
                  <Link to="/profile" className="flex items-center gap-3 text-slate-700 hover:bg-primary/5 hover:text-primary rounded-xl p-3 transition-colors">
                    <User size={18} /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/dashboard/${
                      role === "admin"
                        ? "admin-home"
                        : role === "seller"
                        ? "seller-home"
                        : "payment-history"
                    }`}
                    className="flex items-center gap-3 text-slate-700 hover:bg-primary/5 hover:text-primary rounded-xl p-3 transition-colors"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                </li>
                <li className="mt-1">
                  <button onClick={handleLogout} className="flex items-center gap-3 text-red-600 hover:bg-red-50 rounded-xl p-3 transition-colors">
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
