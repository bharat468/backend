import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { SkeletonGrid } from "../components/SkeletonCard";
import instance from "../axiosConfig";
import { FaShoppingBag, FaFilter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(true);
  const [loading, setLoading] = useState(true);

  async function fetchCategories() {
    try {
      const res = await instance.get("/category");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchProducts(category = "all") {
    try {
      setLoading(true);

      let url = "/product";
      if (category !== "all") {
        url += `?category=${category}`;
      }

      const res = await instance.get(url);
      let products = res.data;

      // Apply sorting
      if (sortBy === "price-low") {
        products = products.sort((a, b) => 
          (a.discountedPrice || a.originalPrice) - (b.discountedPrice || b.originalPrice)
        );
      } else if (sortBy === "price-high") {
        products = products.sort((a, b) => 
          (b.discountedPrice || b.originalPrice) - (a.discountedPrice || a.originalPrice)
        );
      }

      setAllProducts(products);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover our handpicked collection of premium products
            </p>
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold shadow-lg"
          >
            <FaFilter />
            <span>Filters</span>
          </motion.button>
        </div>

        {/* Filters Section */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 flex flex-col sm:flex-row gap-4 md:flex"
            >
              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Products Grid */}
      {loading ? (
        <SkeletonGrid count={8} />
      ) : allProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[60vh] gap-6"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
            <FaShoppingBag className="text-6xl text-white" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or check back later
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              slug={product.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
