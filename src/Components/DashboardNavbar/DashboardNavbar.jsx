import React from "react";
import { NavLink,Link } from "react-router-dom";
import { FaUserShield, FaUsers, FaBoxes, FaCreditCard, FaAd, FaCapsules, FaMoneyBillWave } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";


const DashboardNavbar = ({ role }) => {
  // Define menu items based on user role
  const menuItems = {
    admin: [
      { name: "Admin Home", path: "/dashboard/admin-home", icon: <FaUserShield /> },
      { name: "Users", path: "/dashboard/users", icon: <FaUsers /> },
      { name: "Category", path: "/dashboard/category", icon: <FaBoxes /> },
      { name: "Payment", path: "/dashboard/payment", icon: <FaCreditCard /> },
      { name: "Report", path: "/dashboard/report", icon: <TbReportAnalytics /> },
      { name: "Ads Manager", path: "/dashboard/ads-manager", icon: <FaAd /> },
    ],
    seller: [
      { name: "Seller Home", path: "/dashboard/seller-home", icon: <FaUserShield /> },
      { name: "Medicines", path: "/dashboard/medicines", icon: <FaCapsules /> },
      { name: "Payment History", path: "/dashboard/payment-history", icon: <FaMoneyBillWave /> },
      { name: "Add Ads", path: "/dashboard/add-ads", icon: <FaAd /> },
    ],
    user: [
      { name: "Payment History", path: "/dashboard/payment-history", icon: <FaMoneyBillWave /> },
    ],
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Mobile Toggle Button */}
        <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">
          Menu
        </label>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-secondary text-base-content min-h-full w-48 p-4">
        <Link to="/" className="text-xl font-bold mb-4 text-center">
            Medic<span className="text-primary">aid</span>
          </Link>
          {/* Render Dynamic Menu */}
          {menuItems[role]?.map((item, index) => (
            <li key={index}>
              <NavLink to={item.path} className="flex items-center gap-2 p-3 font-bold text-md text-left hover:bg-accent rounded hover:text-white">
                {item.icon} <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardNavbar;
