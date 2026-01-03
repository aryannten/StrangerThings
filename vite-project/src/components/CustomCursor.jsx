import React, { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

const CustomCursor = ({ inUpsideDown }) => {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const trailRef = useRef([])
  const [isHovering, setIsHovering] = useState(false)
  const [particles, setParticles] = useState([])
  const particleIdRef = useRef(0)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Create particle trail in Upside Down
      if (inUpsideDown && Math.random() > 0.7) {
        const newParticle = {
          id: particleIdRef.current++,
          x: mouseX,
          y: mouseY,
          size: 2 + Math.random() * 4
        }
        setParticles(prev => [...prev.slice(-20), newParticle])
        
        // Remove particle after animation
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id))
        }, 2000)
      }
    }

    const animate = () => {
      // Smooth follow
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15

      if (cursor) {
        cursor.style.left = `${cursorX}px`
        cursor.style.top = `${cursorY}px`
      }

      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`
        cursorDot.style.top = `${mouseY}px`
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Track hoverable elements
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const hoverables = document.querySelectorAll('button, a, .character-card, .villain-card, .audio-toggle')
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [inUpsideDown])

  return (
    <>
      {/* Main cursor glow */}
      <div 
        ref={cursorRef}
        className={`custom-cursor ${inUpsideDown ? 'upside-down' : 'normal'} ${isHovering ? 'hovering' : ''}`}
      >
        <div className="cursor-glow"></div>
        {!inUpsideDown && <div className="flashlight-beam"></div>}
        {inUpsideDown && <div className="red-pulse"></div>}
      </div>

      {/* Center dot */}
      <div 
        ref={cursorDotRef}
        className={`cursor-dot ${inUpsideDown ? 'upside-down' : ''} ${isHovering ? 'hovering' : ''}`}
      />

      {/* Particle trail */}
      {inUpsideDown && particles.map(particle => (
        <div
          key={particle.id}
          className="cursor-particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size
          }}
        />
      ))}
    </>
  )
}

export default CustomCursor
