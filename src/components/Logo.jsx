import React from 'react'

function Logo({ width = "120px" }) {
  return (
    <div style={{ width }} className="flex items-center gap-2 select-none">
      {/* Geometric logo mark */}
      <div className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0" style={{ backgroundColor: '#C8FF2E' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="5" height="5" rx="1" fill="#000"/>
          <rect x="8" y="1" width="5" height="5" rx="1" fill="#000" opacity="0.5"/>
          <rect x="1" y="8" width="5" height="5" rx="1" fill="#000" opacity="0.5"/>
          <rect x="8" y="8" width="5" height="5" rx="1" fill="#000"/>
        </svg>
      </div>
      <span className="font-bold tracking-tight whitespace-nowrap" style={{ color: '#FFFFFF', fontSize: '1rem', letterSpacing: '-0.03em' }}>
        Blogify<span style={{ color: '#C8FF2E' }}>X</span>
      </span>
    </div>
  )
}

export default Logo