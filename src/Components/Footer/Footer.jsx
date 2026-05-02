import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Facebook, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-8 border-t-[8px] border-primary">
      <div className="container mx-auto px-6">
        {/* Top Section: Newsletter & Brand */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 pb-12 border-b border-slate-800">
          <div className="space-y-6">
            <Link to="/" className="flex gap-2 items-center">
              <img src="/favicon.png" alt="Medicaid Logo" className="h-12 w-12 object-contain brightness-0 invert" />
              <span className="text-3xl font-heading font-extrabold text-white tracking-tight">
                Medic<span className="text-primary">aid</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-md text-lg">
              Your trusted premium healthcare partner. Delivering 100% genuine medicines securely to your doorstep.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                <Twitter size={22} />
              </a>
              <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                <Linkedin size={22} />
              </a>
              <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                <Facebook size={22} />
              </a>
            </div>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-2">Subscribe to our Newsletter</h3>
            <p className="text-slate-400 mb-6 text-sm">Get the latest updates on health products, offers, and tips.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="input input-bordered w-full bg-slate-900 border-slate-700 text-white focus:border-primary focus:ring-1 focus:ring-primary rounded-xl" />
              <button className="btn btn-primary text-white rounded-xl shadow-lg shadow-primary/30 px-8">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-400 hover:text-primary hover:translate-x-1 inline-block transition-transform">Home</Link></li>
              <li><Link to="/shop" className="text-slate-400 hover:text-primary hover:translate-x-1 inline-block transition-transform">Shop Medicines</Link></li>
              <li><Link to="/categories" className="text-slate-400 hover:text-primary hover:translate-x-1 inline-block transition-transform">Browse Categories</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-primary hover:translate-x-1 inline-block transition-transform">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-primary hover:translate-x-1 inline-block transition-transform">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal & Policies</h4>
            <ul className="space-y-4">
              <li><Link to="/privacy-policy" className="text-slate-400 hover:text-primary hover:translate-x-1 inline-block transition-transform">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="text-slate-400 hover:text-primary hover:translate-x-1 inline-block transition-transform">Refund & Return Policy</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-primary hover:translate-x-1 inline-block transition-transform">Terms of Service</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-primary hover:translate-x-1 inline-block transition-transform">Shipping Information</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Details</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-slate-800 rounded-lg text-primary shrink-0"><MapPin size={20} /></div>
                <span className="text-slate-400 text-sm leading-relaxed">123 Health Avenue, Medical District<br/>Dhaka 1212, Bangladesh</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 bg-slate-800 rounded-lg text-primary shrink-0"><Phone size={20} /></div>
                <span className="text-slate-400 text-sm">+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 bg-slate-800 rounded-lg text-primary shrink-0"><Mail size={20} /></div>
                <span className="text-slate-400 text-sm">support@medicaid.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 gap-4">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Medicaid E-commerce. All rights reserved.</p>
          <div className="flex gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Dummy Payment Icons to simulate real website feel */}
            <div className="px-3 py-1.5 bg-white rounded flex items-center justify-center font-bold text-xs text-blue-800 border border-slate-200">VISA</div>
            <div className="px-3 py-1.5 bg-white rounded flex items-center justify-center font-bold text-xs text-orange-600 border border-slate-200">MasterCard</div>
            <div className="px-3 py-1.5 bg-white rounded flex items-center justify-center font-bold text-xs text-blue-500 border border-slate-200">Stripe</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;