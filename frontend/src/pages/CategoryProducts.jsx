import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { SkeletonGrid } from "../components/SkeletonCard";
import instance from "../axiosConfig";
import { useParams, Link } from "react-router-dom";
import { FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

function CategoryProducts() {
  const { category } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  async function fetchCategoryProducts() { 
    try {
      setLoading(true);
      const res = await instance.get(`/product?category=${category}`);
      setAllProducts(res.data);

      // Get category name
      const catRes = await instance.get("/category");
      const foundCat = catRes.data.find(c => c.slug === category);
      setCategoryName(foundCat?.name || category);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8 xs:py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 xs:mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-sm xs:text-base text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-3 xs:mb-4 transition-colors"
          >
            <FaArrowLeft className="text-sm xs:text-base" />
            <span>Back to Home</span>
          </Link>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            {categoryName} <span className="gradient-text">Collection</span>
          </h1>
          <p className="text-sm xs:text-base text-gray-400">
            {loading ? "Loading..." : `${allProducts.length} products available`}
          </p>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <SkeletonGrid count={8} />
        ) : allProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[50vh] xs:min-h-[60vh] gap-4 xs:gap-6 px-4"
          >
            <div className="w-24 h-24 xs:w-32 xs:h-32 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
              <FaShoppingBag className="text-4xl xs:text-5xl md:text-6xl text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-xl xs:text-2xl font-bold text-white mb-2">
                No Products Found
              </h3>
              <p className="text-sm xs:text-base text-gray-400 mb-4 xs:mb-6">
                This category doesn't have any products yet
              </p>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 xs:px-8 py-2.5 xs:py-3 text-sm xs:text-base btn-premium text-white font-semibold rounded-full"
                >
                  Browse All Products
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-6">
            {allProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                slug={product.slug}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default CategoryProducts;
