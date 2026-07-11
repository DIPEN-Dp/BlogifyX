import { useId } from "react";
import React from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1.5 pl-1 text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <select
        className={`glass-input px-4 py-2.5 rounded-xl w-full text-sm appearance-none cursor-pointer ${className}`}
        id={id}
        {...props}
        ref={ref}
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "1.25rem",
          backgroundRepeat: "no-repeat",
          paddingRight: "2.5rem"
        }}
      >
        {options?.map((option)=>(
            <option key={option} value={option} className="bg-[#0f0a1e] text-slate-200">
                {option}
            </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
