import { motion } from "framer-motion";
import { FaBolt, FaClock, FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function DealsSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const deals = [
    {
      title: "Flash Sale",
      discount: "70% OFF",
      description: "Limited time offer on electronics",
      gradient: "from-orange-500 to-red-600",
      icon: <FaBolt className="text-4xl" />,
    },
    {
      title: "Daily Deals",
      discount: "50% OFF",
      description: "New deals every day",
      gradient: "from-blue-500 to-cyan-600",
      icon: <FaClock className="text-4xl" />,
    },
    {
      title: "Hot Offers",
      discount: "60% OFF",
      description: "Trending products at best prices",
      gradient: "from-pink-500 to-purple-600",
      icon: <FaFire className="text-4xl" />,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Today's <span className="gradient-text">Hot Deals</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Don't miss out on these amazing limited-time offers
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Ends in:
            </span>
            <div className="flex space-x-2">
              {[
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-bold text-xl min-w-[60px]">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link to="/deals" className="block group">
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${deal.gradient} p-8 shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-white">
                    {/* Icon */}
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-4"
                    >
                      {deal.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2">{deal.title}</h3>

                    {/* Discount */}
                    <div className="text-5xl font-black mb-3">
                      {deal.discount}
                    </div>

                    {/* Description */}
                    <p className="text-white/90 mb-6">{deal.description}</p>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-white text-gray-900 rounded-full font-bold shadow-lg group-hover:shadow-xl transition-all"
                    >
                      Shop Now
                    </motion.button>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Deals Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/deals">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 btn-premium text-white font-bold text-lg rounded-full shadow-xl"
            >
              View All Deals
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default DealsSection;
