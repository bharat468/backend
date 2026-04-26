import { motion } from "framer-motion";
import { FaArrowRight, FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Summer Collection 2026",
      subtitle: "Up to 70% Off",
      description: "Discover the latest trends in fashion and electronics",
      gradient: "from-purple-600 via-pink-600 to-red-600",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80",
    },
    {
      title: "Tech Gadgets Sale",
      subtitle: "Best Deals on Electronics",
      description: "Premium quality at unbeatable prices",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&h=600&fit=crop&q=80",
    },
    {
      title: "New Arrivals",
      subtitle: "Fresh & Trending",
      description: "Be the first to grab the latest products",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop&q=80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const features = [
    {
      icon: <FaShippingFast className="text-3xl" />,
      title: "Free Shipping",
      description: "On orders over ₹999",
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Secure Payment",
      description: "100% protected",
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "24/7 Support",
      description: "Dedicated support",
    },
  ];

  return (
    <div className="relative">
      {/* Main Hero Slider */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1,
            }}
            transition={{ duration: 0.7 }}
            className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`}
          >
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                {/* Text Content */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{
                    x: currentSlide === index ? 0 : -100,
                    opacity: currentSlide === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-white space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold"
                  >
                    {slide.subtitle}
                  </motion.div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl text-white/90 max-w-lg">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        const productsSection = document.getElementById('products-section');
                        if (productsSection) {
                          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg flex items-center space-x-2 shadow-2xl hover:shadow-white/50 transition-all cursor-pointer"
                      >
                        <span>Shop Now</span>
                        <FaArrowRight />
                      </motion.div>
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{
                    x: currentSlide === index ? 0 : 100,
                    opacity: currentSlide === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="hidden md:block"
                >
                  <motion.img
                    animate={{
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-auto drop-shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
