import React from 'react'

function Button({
    children,
    type="button",
    bgColor="btn-gradient",
    textColor="text-white",
    className='',
    ...props
}) {
  return (
    <button
      type={type}
      className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button