import React from 'react';
import { Link } from 'react-router-dom';
import { Pill } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t-4 border-primary pt-16 pb-8">
      <div className="container mx-auto px-6">

        {/* Brand + Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12 pb-12 border-b border-slate-800">

          {/* Brand */}
          <div className="space-y-4 max-w-xs">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-primary/10 p-2.5 rounded-xl group-hover:bg-primary transition-colors duration-300">
                <Pill size={22} className="text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Medic<span className="text-primary">aid</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted premium healthcare partner. Delivering 100% genuine medicines securely to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Shop Medicines', to: '/shop' },
                { label: 'About Us', to: '/about' },
                { label: 'Contact', to: '/contact' },
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Refund Policy', to: '/refund-policy' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} Medicaid E-commerce. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;