import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Our Mission for Better Health</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Medicaid is a revolutionary multi-vendor e-commerce platform dedicated to bridging the gap between certified pharmaceutical sellers and patients in need. We ensure quality, affordability, and speed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Medical Team" 
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-slate-800">Why We Started</h2>
            <p className="text-slate-600 leading-relaxed">
              Finding genuine medicines from trusted sellers used to be a hassle. We built Medicaid to create a secure, transparent marketplace where buyers can compare prices, read descriptions, and order exactly what they need with confidence.
            </p>
            <ul className="space-y-4">
              {['Strict Seller Verification', '100% Genuine Medicines', '24/7 Customer Support'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
