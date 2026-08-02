import { useId } from "react";
import React from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="block mb-2 text-sm font-medium"
          style={{ color: '#9CA3AF' }}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`input-field ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
