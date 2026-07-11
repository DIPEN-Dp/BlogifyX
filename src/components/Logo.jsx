import React from 'react'

function Logo({width="100px"}) {
  return (
    <div style={{width}} className="flex items-center gap-2 select-none">
      <span className="text-xl font-black gradient-text tracking-tight whitespace-nowrap">
        ✦ BlogifyX
      </span>
    </div>
  )
}

export default Logo