import React from 'react'

function Button({
    children,
    type="button",
    bgColor="bg-brand-orange-500 hover:bg-brand-orange-600",
    textColor="text-white",
    className='',
    ...props
}) {
  return (
    <button
      type={type}
      className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button