import React from 'react'
import './VHSFilter.css'

const VHSFilter = ({ intensity = 1, inUpsideDown = false }) => {
  return (
    <div className={`vhs-filter ${inUpsideDown ? 'upside-down-mode' : ''}`} style={{ '--intensity': intensity }}>
      {/* Scan lines */}
      <div className="vhs-scanlines" />
      
      {/* RGB shift/chromatic aberration */}
      <div className="vhs-rgb-shift" />
      
      {/* Static noise */}
      <div className="vhs-noise" />
      
      {/* Tracking lines */}
      <div className="vhs-tracking">
        <div className="tracking-line line-1" />
        <div className="tracking-line line-2" />
        <div className="tracking-line line-3" />
      </div>
      
      {/* Vignette */}
      <div className="vhs-vignette" />
      
      {/* Color bleed */}
      <div className="vhs-color-bleed" />
      
      {/* Glitch bars - random horizontal distortions */}
      <div className="vhs-glitch-container">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="glitch-bar"
            style={{
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 7}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default VHSFilter
