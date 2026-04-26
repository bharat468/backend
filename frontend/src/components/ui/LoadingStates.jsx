import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

/**
 * Full Page Loading Spinner
 */
export function PageLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-4 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full"
        />
        <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
      </motion.div>
    </div>
  );
}

/**
 * Button Loading Spinner
 */
export function ButtonLoader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <FaSpinner className="text-lg" />
      </motion.div>
      <span>{text}</span>
    </div>
  );
}

/**
 * Skeleton Loader for Cards
 */
export function SkeletonLoader({ count = 1, className = "" }) {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-white dark:bg-slate-800 rounded-xl p-4 ${className}`}
        >
          <div className="h-48 bg-gray-200 dark:bg-slate-700 rounded-lg mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
        </div>
      ))}
    </>
  );
}

/**
 * Inline Loading Spinner
 */
export function InlineLoader({ size = "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full`}
    />
  );
}

/**
 * Content Loading Overlay
 */
export function LoadingOverlay({ message = "Loading..." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 mx-auto mb-4 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full"
        />
        <p className="text-gray-900 dark:text-white font-semibold text-center">
          {message}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default {
  PageLoader,
  ButtonLoader,
  SkeletonLoader,
  InlineLoader,
  LoadingOverlay,
};
