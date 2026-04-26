import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFire, FaTag } from "react-icons/fa";
import instance from "../axiosConfig";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { toast } from "react-toastify";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        instance.get("/product"),
        instance.get("/category")
      ]);
      
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Categories Section */}
      <section className="py-8 xs:py-10 sm:py-12 md:py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 xs:mb-7 sm:mb-8"
          >
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-2 xs:mb-3">
              Shop by Category
            </h2>
            <p className="text-sm xs:text-base text-slate-400 px-2">
              Find exactly what you're looking for
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 xs:gap-2.5 sm:gap-3 mb-8 xs:mb-10 sm:mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full font-semibold text-xs xs:text-sm sm:text-base transition-all ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full font-semibold text-xs xs:text-sm sm:text-base transition-all ${
                  activeCategory === category.name
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-8 xs:py-10 sm:py-12 md:py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 xs:mb-10 sm:mb-12"
          >
            <div className="inline-flex items-center space-x-1.5 xs:space-x-2 bg-purple-900/30 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full mb-3 xs:mb-4 border border-purple-500/30">
              <FaFire className="text-orange-500 text-sm xs:text-base" />
              <span className="text-xs xs:text-sm font-semibold text-purple-300">
                Trending Now
              </span>
            </div>
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-2 xs:mb-3">
              Featured Products
            </h2>
            <p className="text-sm xs:text-base text-slate-400 px-2">
              Handpicked just for you
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center opacity-20">
                <FaTag className="text-6xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Products Found
              </h3>
              <p className="text-slate-400 mb-6">
                Try selecting a different category
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} slug={product.slug} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;

