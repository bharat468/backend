import { PiCurrencyInrLight } from "react-icons/pi";
import { FaImage, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

function ProductCard({ product, slug }) {
  const [imgLoading, setImgLoading] = useState(true);

  // Correct Image URL
  const imgSrc = product.image?.startsWith("http")
    ? product.image
    : `${import.meta.env.VITE_BASEURL}${product.image?.startsWith("/") ? "" : "/"}${product.image}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-slate-800/50 backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden border border-slate-700/50 hover:border-purple-500/50"
    >
      {/* Discount Badge */}
      {product.discountedPrice && (
        <div className="absolute top-2 xs:top-3 left-2 xs:left-3 z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] xs:text-xs font-bold px-2 xs:px-3 py-0.5 xs:py-1 rounded-full shadow-lg">
          {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
        </div>
      )}

      {/* Image Container */}
      <Link to={`/product/${slug}`} className="block relative h-40 xs:h-48 sm:h-56 bg-white overflow-hidden">
        {imgLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <FaImage className="text-2xl xs:text-3xl sm:text-4xl text-purple-500/30 animate-pulse" />
          </div>
        )}
        <img
          src={imgSrc}
          alt={product.name}
          onLoad={() => setImgLoading(false)}
          onError={() => setImgLoading(false)}
          className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-110 p-2 xs:p-3 ${
            imgLoading ? "opacity-0" : "opacity-100"
          }`}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="p-3 xs:p-4 space-y-2 xs:space-y-3">
        
        {/* Product Name */}
        <Link to={`/product/${slug}`}>
          <h3 className="text-xs xs:text-sm sm:text-base font-semibold text-white line-clamp-2 group-hover:text-purple-400 transition-colors min-h-[2.5rem] xs:min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-0.5 xs:gap-1 flex-wrap">
            <PiCurrencyInrLight className="text-base xs:text-lg sm:text-xl text-slate-400 flex-shrink-0" />
            {product.discountedPrice ? (
              <div className="flex items-center gap-1 xs:gap-2 flex-wrap">
                <span className="text-sm xs:text-base sm:text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {product.discountedPrice}
                </span>
                <del className="text-slate-500 text-[10px] xs:text-xs sm:text-sm">{product.originalPrice}</del>
              </div>
            ) : (
              <span className="text-sm xs:text-base sm:text-lg font-bold text-white">{product.originalPrice}</span>
            )}
          </div>

          {/* Quick Add Button */}
          <Link to={`/product/${slug}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 xs:p-2 rounded-md xs:rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-purple-500/50 transition-all flex-shrink-0"
            >
              <FaShoppingCart className="text-xs xs:text-sm" />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-lg xs:rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600/0 via-pink-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:via-pink-600/10 group-hover:to-purple-600/10 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}

export default ProductCard;
