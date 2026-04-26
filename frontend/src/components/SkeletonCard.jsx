import { motion } from "framer-motion";

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-200 dark:bg-slate-700 skeleton" />

      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded skeleton w-3/4" />
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded skeleton w-1/2" />

        {/* Rating */}
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded skeleton w-1/3" />

        {/* Price */}
        <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded skeleton w-1/2" />

        {/* Button */}
        <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded-xl skeleton" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  );
}

export default SkeletonCard;
