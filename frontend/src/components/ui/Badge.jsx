import { components } from "../../styles/designSystem";

const Badge = ({ 
  children, 
  variant = "primary",
  className = "",
  ...props 
}) => {
  const badgeClass = components.badge[variant] || components.badge.primary;

  return (
    <span className={`${badgeClass} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
