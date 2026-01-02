import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300 mt-16">
      
      {/* TOP CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* BRAND */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">
            MyEcommerce
          </h3>
          <p className="text-slate-400 leading-relaxed">
            Your trusted store for best products.  
            Quality, affordability, and fast delivery — all in one place.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="#" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT / EXTRA */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Support
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>Email: bharatpareek256@gmail.com</li>
            <li>Phone: +91 8003953815</li>
            <li>Mon – Sat: 10AM – 7PM</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} MyEcommerce. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
