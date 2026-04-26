import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaLaptop, FaMobileAlt, FaTshirt, FaHome, FaGamepad, FaBook, FaShoppingBag, FaClock } from "react-icons/fa";
import instance from "../axiosConfig";

function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping for categories
  const iconMap = {
    electronics: <FaLaptop className="text-4xl" />,
    mobile: <FaMobileAlt className="text-4xl" />,
    mobiles: <FaMobileAlt className="text-4xl" />,
    fashion: <FaTshirt className="text-4xl" />,
    clothes: <FaTshirt className="text-4xl" />,
    clothing: <FaTshirt className="text-4xl" />,
    home: <FaHome className="text-4xl" />,
    gaming: <FaGamepad className="text-4xl" />,
    books: <FaBook className="text-4xl" />,
    watches: <FaClock className="text-4xl" />,
    watch: <FaClock className="text-4xl" />,
  };

  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-green-500 to-teal-500",
    "from-indigo-500 to-purple-500",
    "from-yellow-500 to-orange-500",
    "from-pink-500 to-rose-500",
    "from-cyan-500 to-blue-500",
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      const res = await instance.get("/category");
      const fetchedCategories = res.data.map((cat, index) => ({
        name: cat.name,
        slug: cat.slug,
        icon: iconMap[cat.slug.toLowerCase()] || <FaShoppingBag className="text-4xl" />,
        gradient: gradients[index % gradients.length],
        link: `/category/${cat.slug}`,
      }));
      setCategories(fetchedCategories);
    } catch (err) {
      console.log("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by <span className="gradient-text">Category</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-slate-700 rounded-2xl skeleton mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded skeleton" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our wide range of products across different categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link
                to={category.link}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className={`relative mb-4 w-16 h-16 mx-auto bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>

                  {/* Category Name */}
                  <h3 className="relative text-center font-semibold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {category.name}
                  </h3>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
