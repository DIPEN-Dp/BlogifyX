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
        <label className="inline-block mb-1.5 pl-1 text-sm font-medium text-neutral-black-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`bg-white border border-neutral-black-200 text-neutral-black-900 rounded-lg focus:outline-none focus:border-brand-orange-500 focus:ring-2 focus:ring-brand-orange-100 placeholder-neutral-black-400 px-4 py-2.5 w-full text-sm transition-all duration-150 ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
