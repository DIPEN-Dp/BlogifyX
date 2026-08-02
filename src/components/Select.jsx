import { useId } from "react";
import React from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium"
          style={{ color: '#9CA3AF' }}
        >
          {label}
        </label>
      )}
      <select
        className={`input-field appearance-none cursor-pointer ${className}`}
        id={id}
        ref={ref}
        {...props}
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "1.25rem",
          backgroundRepeat: "no-repeat",
          paddingRight: "2.5rem",
          backgroundColor: '#111111',
          borderColor: '#2B2B2B',
          color: '#FFFFFF',
        }}
      >
        {options?.map((option) => (
          <option key={option} value={option} style={{ backgroundColor: '#171717', color: '#FFFFFF' }}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
