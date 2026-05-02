import React from "react";
import useHelmet from './../../Hooks/useHelmet';
import DiscountProductsCarousel from "../../Components/DiscountProductsCarousel/DiscountProductsCarousel";
import CategoryCards from "../../Components/CategoryCards/CategoryCards";
import Slider from "../../Components/Slider/Slider";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Clock, HeartPulse } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-background min-h-screen">
      {useHelmet("Home")}

      {/* Hero Section */}
      <div className="relative">
        <Slider/>
        
        {/* Glassmorphic Overlay CTA (If Slider doesn't cover this) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-11/12 max-w-4xl"
        >
          <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Your Health, Delivered.</h2>
              <p className="text-slate-600 mt-2">Get genuine medicines from certified sellers at the best prices.</p>
            </div>
            <button className="btn btn-primary text-white rounded-full px-8 shadow-lg shadow-primary/30">
              Shop Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <ShieldCheck size={32} className="text-primary"/>, title: "100% Genuine", desc: "Certified Products" },
            { icon: <Truck size={32} className="text-primary"/>, title: "Fast Delivery", desc: "Across the country" },
            { icon: <Clock size={32} className="text-primary"/>, title: "24/7 Support", desc: "We're here for you" },
            { icon: <HeartPulse size={32} className="text-primary"/>, title: "Health First", desc: "Quality guaranteed" },
          ].map((badge, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                {badge.icon}
              </div>
              <h3 className="font-bold text-slate-800">{badge.title}</h3>
              <p className="text-sm text-slate-500">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 space-y-24 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Shop by Category</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Browse our wide selection of medicines organized by categories for your convenience.</p>
          </div>
          <CategoryCards/>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Hot Discounts</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Grab these limited-time offers on essential medicines and healthcare products.</p>
          </div>
          <DiscountProductsCarousel/>
        </motion.div>
      </div>

    </div>
  );
};

export default Home;
