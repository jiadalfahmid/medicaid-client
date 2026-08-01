import React from "react";
import useAuth from "../../Hooks/useAuth"; 
import { motion } from "framer-motion";
import { User, Mail, Calendar, Activity, ShoppingBag, ShieldCheck, Star } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user } = useAuth();
  
  // Example derived role (In a real app, this might come from a context or API)
  // For the sake of UI demonstration, we'll assume a generic view if role isn't passed down.
  const role = "User"; // Placeholder. Could be fetched if needed.

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="container mx-auto p-4 md:p-8 max-w-5xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Profile Card */}
      <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 relative overflow-hidden">
        
        {/* Decorative Background blob */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative">
          <img
            src={user?.photoURL || "https://ui-avatars.com/api/?name=" + (user?.displayName || "User")} 
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg z-10 relative"
          />
          <div className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white z-20"></div>
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{user?.displayName || "Anonymous User"}</h2>
            <div className="badge badge-primary badge-outline font-medium flex gap-1">
              <ShieldCheck size={14} /> {role}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4 text-slate-600">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Mail size={18} className="text-primary" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Calendar size={18} className="text-primary" />
              <span>Joined {new Date(user?.metadata?.creationTime).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="z-10">
          <button 
            onClick={() => toast("Edit Profile feature coming soon!", { icon: "🔧" })}
            className="btn btn-primary text-white rounded-full px-8 shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
            Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
            <ShoppingBag size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Orders</p>
            <h4 className="text-2xl font-bold text-slate-800">24</h4>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
          <div className="bg-green-100 p-4 rounded-xl text-green-600">
            <Activity size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Active Subscriptions</p>
            <h4 className="text-2xl font-bold text-slate-800">2</h4>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
          <div className="bg-orange-100 p-4 rounded-xl text-orange-600">
            <Star size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Saved Items</p>
            <h4 className="text-2xl font-bold text-slate-800">12</h4>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Activity className="text-primary" /> Recent Activity
        </h3>
        
        <div className="flex flex-col gap-4">
          {/* Mocked Activity Items */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
              <div className="bg-slate-100 p-3 rounded-lg text-slate-500">
                <ShoppingBag size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">Purchased Paracetamol 500mg</p>
                <p className="text-sm text-slate-500">Order #100{item} • 2 days ago</p>
              </div>
              <div className="font-bold text-primary">
                $12.50
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => toast("Full activity history coming soon!", { icon: "📋" })}
          className="w-full mt-6 py-3 text-primary font-medium hover:bg-slate-50 rounded-xl transition-colors">
          View All Activity
        </button>
      </motion.div>

    </motion.div>
  );
};

export default ProfilePage;
