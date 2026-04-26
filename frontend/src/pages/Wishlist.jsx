import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Wishlist() {
  // Placeholder data - replace with actual wishlist state
  const wishlistItems = [];

  const handleRemove = (id) => {
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (id) => {
    toast.success("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My <span className="gradient-text">Wishlist</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {wishlistItems.length} items saved for later
          </p>
        </motion.div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center mb-6">
              <FaHeart className="text-6xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start adding products you love!
            </p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 btn-premium text-white font-semibold rounded-full"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Wishlist items would be mapped here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
