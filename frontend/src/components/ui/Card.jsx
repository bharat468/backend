import { motion } from "framer-motion";
import { components } from "../../styles/designSystem";

const Card = ({ 
  children, 
  className = "",
  hover = true,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      className={`${components.card} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
