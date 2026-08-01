import React from "react";
import useHelmet from './../../Hooks/useHelmet';
import DiscountProductsCarousel from "../../Components/DiscountProductsCarousel/DiscountProductsCarousel";
import CategoryCards from "../../Components/CategoryCards/CategoryCards";
import Slider from "../../Components/Slider/Slider";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Clock, HeartPulse, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-surface min-h-screen pb-20">
      {useHelmet("Home")}

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <Slider/>
        </div>
        
        {/* Elegant Content Overlay */}
        <div className="relative z-20 container mx-auto px-6 h-[80vh] min-h-[600px] flex items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-white space-y-6"
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary-content text-sm font-semibold tracking-wide border border-primary/30 inline-block backdrop-blur-md">
              100% Genuine Medicine
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight leading-[1.1] text-balance">
              Your Health, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Delivered.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl text-balance">
              Get genuine medicines from certified sellers at the best prices. Fast, reliable, and secure delivery to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/shop" className="btn btn-primary text-white rounded-full px-8 shadow-lg shadow-primary/30 hover:scale-105 transition-transform border-none group">
                Shop Now <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="btn btn-ghost text-white rounded-full px-8 hover:bg-white/10 transition-colors">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="container mx-auto px-6 -mt-16 relative z-30 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: <ShieldCheck size={28} className="text-primary"/>, title: "100% Genuine", desc: "Certified Products" },
            { icon: <Truck size={28} className="text-primary"/>, title: "Fast Delivery", desc: "Across the country" },
            { icon: <Clock size={28} className="text-primary"/>, title: "24/7 Support", desc: "We're here for you" },
            { icon: <HeartPulse size={28} className="text-primary"/>, title: "Health First", desc: "Quality guaranteed" },
          ].map((badge, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-soft hover:shadow-hover border border-slate-50 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="bg-primary/5 p-4 rounded-full mb-4 group-hover:bg-primary/10 transition-colors group-hover:scale-110 duration-300">
                {badge.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">{badge.title}</h3>
              <p className="text-sm text-slate-500">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 space-y-32">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-800 mb-3 tracking-tight">Shop by Category</h2>
            <p className="text-slate-500 max-w-2xl text-balance">Browse our wide selection of medicines organized by categories for your convenience.</p>
          </div>
          <CategoryCards/>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100"
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-800 tracking-tight">Hot Discounts</h2>
              </div>
              <p className="text-slate-500 max-w-2xl text-balance">Grab these limited-time offers on essential medicines and healthcare products before they're gone.</p>
            </div>
          </div>
          <DiscountProductsCarousel/>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-800 mb-3 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know about our products and services.</p>
          </div>
          
          <div className="join join-vertical w-full bg-white rounded-3xl shadow-soft border border-slate-100">
            <div className="collapse collapse-arrow join-item border-b border-slate-100">
              <input type="radio" name="faq-accordion" defaultChecked /> 
              <div className="collapse-title text-lg font-semibold text-slate-800 p-6">
                Are your medicines 100% genuine?
              </div>
              <div className="collapse-content text-slate-600 px-6 pb-6"> 
                <p>Yes, absolutely. We only source our products from certified manufacturers and authorized sellers. Every product undergoes strict quality checks before being listed on our platform.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-b border-slate-100">
              <input type="radio" name="faq-accordion" /> 
              <div className="collapse-title text-lg font-semibold text-slate-800 p-6">
                How fast is your delivery?
              </div>
              <div className="collapse-content text-slate-600 px-6 pb-6"> 
                <p>We offer standard delivery within 2-3 business days. For emergency medications, we have an expedited shipping option that delivers within 24 hours in selected areas.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item">
              <input type="radio" name="faq-accordion" /> 
              <div className="collapse-title text-lg font-semibold text-slate-800 p-6">
                What is your return policy for medicines?
              </div>
              <div className="collapse-content text-slate-600 px-6 pb-6"> 
                <p>For safety and hygiene reasons, we cannot accept returns on prescription medicines. However, if you receive a damaged or incorrect product, we will issue a full refund or replacement immediately. Please check our Refund Policy for more details.</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

    </div>
  );
};

export default Home;
