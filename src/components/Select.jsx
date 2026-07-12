import { useId } from "react";
import React from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1.5 pl-1 text-sm font-medium text-neutral-black-700">
          {label}
        </label>
      )}
      <select
        className={`bg-white border border-neutral-black-200 text-neutral-black-900 rounded-lg focus:outline-none focus:border-brand-orange-500 focus:ring-2 focus:ring-brand-orange-100 w-full text-sm appearance-none cursor-pointer transition-all duration-150 ${className}`}
        id={id}
        {...props}
        ref={ref}
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23767676' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "1.25rem",
          backgroundRepeat: "no-repeat",
          paddingRight: "2.5rem"
        }}
      >
        {options?.map((option)=>(
            <option key={option} value={option} className="bg-white text-neutral-black-900">
                {option}
            </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
