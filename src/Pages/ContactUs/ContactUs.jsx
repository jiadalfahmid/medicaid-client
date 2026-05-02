import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Get in Touch</h1>
          <p className="text-slate-600">Have questions? We're here to help.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: <Phone size={24}/>, title: "Phone", info: "+1 (555) 123-4567" },
            { icon: <Mail size={24}/>, title: "Email", info: "support@medicaid.com" },
            { icon: <MapPin size={24}/>, title: "Office", info: "123 Health Ave, NY" },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.info}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl mx-auto"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                <input type="text" className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input type="email" className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea rows="5" className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="How can we help?"></textarea>
            </div>
            <button type="button" className="btn btn-primary w-full text-white rounded-xl shadow-lg shadow-primary/30">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
