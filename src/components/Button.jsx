import React from 'react'

function Button({
  children,
  type = "button",
  variant = "primary",   // primary | secondary | danger | ghost
  className = '',
  ...props
}) {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    ghost: "btn-secondary",
  };

  const cls = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      className={`${cls} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button