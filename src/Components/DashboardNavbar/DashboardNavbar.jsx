import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Box,
  CreditCard,
  BarChart3,
  Megaphone,
  Home,
  Pill,
  History,
  ShoppingBag,
  Menu
} from "lucide-react";
import { motion } from "framer-motion";

const DashboardNavbar = ({ role }) => {
  const location = useLocation();

  // Define menu items based on user role
  const menuItems = {
    admin: [
      { name: "Admin Home", path: "/dashboard/admin-home", icon: <LayoutDashboard size={20} /> },
      { name: "Users", path: "/dashboard/users", icon: <Users size={20} /> },
      { name: "Category", path: "/dashboard/category", icon: <Box size={20} /> },
      { name: "Payment", path: "/dashboard/payment", icon: <CreditCard size={20} /> },
      { name: "Report", path: "/dashboard/report", icon: <BarChart3 size={20} /> },
      { name: "Ads Manager", path: "/dashboard/ads-manager", icon: <Megaphone size={20} /> },
      { name: "Home", path: "/", icon: <Home size={20} /> },
    ],
    seller: [
      { name: "Seller Home", path: "/dashboard/seller-home", icon: <LayoutDashboard size={20} /> },
      { name: "Medicines", path: "/dashboard/medicines", icon: <Pill size={20} /> },
      { name: "Payment History", path: "/dashboard/payment-history", icon: <History size={20} /> },
      { name: "Add Ads", path: "/dashboard/add-ads", icon: <Megaphone size={20} /> },
      { name: "Home", path: "/", icon: <Home size={20} /> },
    ],
    user: [
      { name: "Payment History", path: "/dashboard/payment-history", icon: <History size={20} /> },
      { name: "Home", path: "/", icon: <Home size={20} /> },
      { name: "Shop", path: "/shop", icon: <ShoppingBag size={20} /> },
    ],
  };

  return (
    <div className="drawer lg:drawer-open h-full">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center relative">
        {/* Mobile Toggle Button */}
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-circle btn-primary btn-sm absolute top-4 left-4 lg:hidden shadow-lg z-50 text-white"
        >
          <Menu size={20} />
        </label>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        
        <div className="menu bg-white/80 backdrop-blur-xl border-r border-slate-200 text-base-content min-h-screen w-64 p-6 shadow-2xl flex flex-col gap-2">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-2 mb-8 px-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary transition-colors duration-300">
              <Pill className="text-primary group-hover:text-white transition-colors duration-300" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800">
              Medic<span className="text-primary">aid</span>
            </span>
          </Link>

          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
            Menu
          </div>

          {/* Render Dynamic Menu */}
          <ul className="flex flex-col gap-1.5 w-full">
            {menuItems[role]?.map((item, index) => (
              <li key={index} className="w-full relative">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
                    ${isActive 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {item.icon}
                      <span>{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute left-0 top-0 w-1 h-full bg-white rounded-r-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
