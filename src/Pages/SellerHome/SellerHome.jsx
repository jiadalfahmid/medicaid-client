import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, DollarSign, Star, TrendingUp } from 'lucide-react';

const SellerHome = () => {
  const { user } = useAuth();
  
  // Mocking seller stats for demonstration of industrial UI
  const stats = { revenue: 1250.50, itemsSold: 45, rating: 4.8 };
  
  const chartData = [
    { name: 'Mon', sales: 120 },
    { name: 'Tue', sales: 200 },
    { name: 'Wed', sales: 150 },
    { name: 'Thu', sales: 300 },
    { name: 'Fri', sales: 250 },
    { name: 'Sat', sales: 400 },
    { name: 'Sun', sales: 350 },
  ];

  const cards = [
    { title: "Total Sales", value: `$${stats.revenue.toFixed(2)}`, icon: <DollarSign size={24}/>, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Items Sold", value: stats.itemsSold, icon: <Package size={24}/>, color: "text-green-600", bg: "bg-green-100" },
    { title: "Store Rating", value: stats.rating, icon: <Star size={24}/>, color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Conversion Rate", value: "3.2%", icon: <TrendingUp size={24}/>, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-7xl mx-auto space-y-6"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Seller Dashboard</h1>
          <p className="text-slate-500">Manage your store and track sales, {user?.displayName}</p>
        </div>
        <button className="btn btn-primary text-white shadow-lg shadow-primary/30">
          Add New Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform"
          >
            <div className={`p-4 rounded-xl ${card.bg} ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{card.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Weekly Sales Performance</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="sales" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Selling Items</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                  <Package className="text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">Paracetamol Pack {i}</p>
                  <p className="text-xs text-slate-500">{20 - i * 2} sales this week</p>
                </div>
                <div className="font-bold text-primary">
                  ${(15.00 * (5-i)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SellerHome;