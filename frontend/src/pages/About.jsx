import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaTruck, FaShieldAlt, FaHeadset, FaHeart, FaAward } from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-14 sm:py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 xs:space-y-5 sm:space-y-6"
          >
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              About ShopHub
            </h1>
            <p className="text-base xs:text-lg md:text-xl text-purple-100 max-w-3xl mx-auto px-2">
              Your trusted destination for premium products. Quality, affordability, and exceptional service — all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 xs:py-14 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 items-center">
            
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600"
                  alt="ShopHub Store"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </div>
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-4 xs:-bottom-6 -right-4 xs:-right-6 bg-white dark:bg-slate-800 rounded-xl xs:rounded-2xl shadow-2xl p-4 xs:p-5 sm:p-6 border border-gray-100 dark:border-slate-700"
              >
                <div className="text-center">
                  <div className="text-2xl xs:text-3xl font-bold gradient-text">50K+</div>
                  <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 xs:space-y-5 sm:space-y-6"
            >
              <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Our Story
              </h2>
              <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Founded with a vision to make quality products accessible to everyone, ShopHub has grown into a trusted e-commerce platform serving thousands of customers worldwide.
              </p>
              <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                We believe in delivering not just products, but experiences. Every item in our catalog is carefully selected to ensure it meets our high standards of quality and value.
              </p>
              <div className="grid grid-cols-2 gap-3 xs:gap-4 pt-3 xs:pt-4">
                <div className="text-center p-3 xs:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="text-xl xs:text-2xl font-bold text-purple-600 dark:text-purple-400">10K+</div>
                  <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">Products</div>
                </div>
                <div className="text-center p-3 xs:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="text-xl xs:text-2xl font-bold text-purple-600 dark:text-purple-400">4.9★</div>
                  <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 xs:py-14 sm:py-16 md:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 xs:mb-10 sm:mb-12"
          >
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 xs:mb-4">
              Why Choose ShopHub?
            </h2>
            <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
              We're committed to providing the best shopping experience with unmatched quality and service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            {[
              {
                icon: FaStar,
                title: "Premium Quality",
                desc: "Every product is carefully selected and quality-tested to ensure you get the best."
              },
              {
                icon: FaTruck,
                title: "Fast Delivery",
                desc: "Quick and reliable shipping to get your products to you as soon as possible."
              },
              {
                icon: FaShieldAlt,
                title: "Secure Shopping",
                desc: "Your data and payments are protected with industry-leading security measures."
              },
              {
                icon: FaHeadset,
                title: "24/7 Support",
                desc: "Our dedicated support team is always here to help you with any questions."
              },
              {
                icon: FaHeart,
                title: "Customer First",
                desc: "Your satisfaction is our priority. We go the extra mile to make you happy."
              },
              {
                icon: FaAward,
                title: "Best Prices",
                desc: "Competitive pricing and regular deals to give you the best value for money."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-xl xs:rounded-2xl p-4 xs:p-5 sm:p-6 hover:shadow-xl transition-all border border-purple-100 dark:border-slate-600"
              >
                <div className="w-12 h-12 xs:w-14 xs:h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-3 xs:mb-4">
                  <feature.icon className="text-xl xs:text-2xl text-white" />
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs xs:text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 xs:py-14 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 xs:mb-10 sm:mb-12"
          >
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 xs:mb-4">
              Meet Our Founder
            </h2>
            <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 px-2">
              Passionate about bringing quality products to customers worldwide
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-sm xs:max-w-md mx-auto"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl xs:rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
              <div className="relative h-56 xs:h-64 bg-gradient-to-br from-purple-600 to-indigo-600">
                <img
                  src="/bharat.png"
                  alt="Bharat Pareek"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 xs:p-5 sm:p-6 text-center">
                <h3 className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Bharat Pareek
                </h3>
                <p className="text-sm xs:text-base text-purple-600 dark:text-purple-400 font-semibold mb-2 xs:mb-3">
                  Founder & CEO
                </p>
                <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">
                  Passionate entrepreneur dedicated to revolutionizing online shopping with quality products and exceptional customer service.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 xs:py-14 sm:py-16 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 xs:space-y-5 sm:space-y-6"
          >
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white">
              Ready to Start Shopping?
            </h2>
            <p className="text-base xs:text-lg text-purple-100 px-2">
              Join thousands of happy customers today
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 xs:px-8 py-3 xs:py-4 bg-white text-purple-600 font-bold text-sm xs:text-base rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Browse Products
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;
