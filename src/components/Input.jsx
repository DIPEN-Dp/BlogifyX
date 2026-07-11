import { useId } from "react";
import React from "react";

const Input = React.forwardRef(function input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div>
      {label && (
        <label className="inline-block mb-1.5 pl-1 text-sm font-medium text-slate-300" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`glass-input px-4 py-2.5 rounded-xl w-full text-sm ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
