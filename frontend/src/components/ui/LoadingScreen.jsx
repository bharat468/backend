import { motion } from "framer-motion";
import { FaShoppingBag } from "react-icons/fa";
import Spinner from "./Spinner";

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl"
        >
          <FaShoppingBag className="text-4xl text-white" />
        </motion.div>
        
        <div className="space-y-3">
          <Spinner size="lg" className="mx-auto" />
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
