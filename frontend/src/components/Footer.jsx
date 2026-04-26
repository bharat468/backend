import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "All Products", path: "/" },
      { name: "Categories", path: "/categories" },
      { name: "New Arrivals", path: "/new" },
      { name: "Best Sellers", path: "/bestsellers" },
      { name: "Deals", path: "/deals" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Careers", path: "/careers" },
      { name: "Blog", path: "/blog" },
      { name: "Press", path: "/press" },
    ],
    support: [
      { name: "Help Center", path: "/help" },
      { name: "Track Order", path: "/track" },
      { name: "Returns", path: "/returns" },
      { name: "Shipping Info", path: "/shipping" },
      { name: "FAQs", path: "/faq" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Refund Policy", path: "/refund" },
    ],
  };

  const socialLinks = [
    { icon: <FaFacebookF />, url: "#", color: "hover:bg-blue-600" },
    { icon: <FaTwitter />, url: "#", color: "hover:bg-sky-500" },
    { icon: <FaInstagram />, url: "#", color: "hover:bg-pink-600" },
    { icon: <FaLinkedinIn />, url: "#", color: "hover:bg-blue-700" },
    { icon: <FaYoutube />, url: "#", color: "hover:bg-red-600" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 mt-20">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-3xl font-bold gradient-text">
                ShopHub
              </h3>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6">
              Your trusted destination for premium products. Quality, affordability, and exceptional service — all in one place.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-purple-500" />
                <span>bharatpareek256@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-purple-500" />
                <span>+91 8003953815</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-purple-500" />
                <span>India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white transition-all ${social.color}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-400">
              © {currentYear} ShopHub. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-400">We Accept:</span>
              <div className="flex space-x-2">
                {["Visa", "Mastercard", "PayPal", "UPI"].map((method, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
