import { forwardRef } from "react";
import { components } from "../../styles/designSystem";

const Input = forwardRef(({ 
  label,
  error,
  icon: Icon,
  className = "",
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        )}
        
        <input
          ref={ref}
          className={`${components.input} ${Icon ? "pl-12" : ""} ${
            error ? "border-red-500 focus:ring-red-500" : ""
          } ${className}`}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
