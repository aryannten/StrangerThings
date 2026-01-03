import React, { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

const CustomCursor = ({ inUpsideDown }) => {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const trailRef = useRef([])
  const [isHovering, setIsHovering] = useState(false)
  const [particles, setParticles] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const particleIdRef = useRef(0)
  const mousePositionRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  // Delay visibility to prevent glitch on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    
    // Initialize to center or last known position
    let mouseX = mousePositionRef.current.x
    let mouseY = mousePositionRef.current.y
    let cursorX = mouseX
    let cursorY = mouseY

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      mousePositionRef.current = { x: mouseX, y: mouseY }

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

  // Don't render until visible and positioned
  if (!isVisible) return null

  return (
    <>
      {/* Main cursor glow */}
      <div 
        ref={cursorRef}
        className={`custom-cursor ${inUpsideDown ? 'upside-down' : 'normal'} ${isHovering ? 'hovering' : ''}`}
        style={{ 
          left: mousePositionRef.current.x,
          top: mousePositionRef.current.y
        }}
      >
        <div className="cursor-glow"></div>
        {!inUpsideDown && <div className="flashlight-beam"></div>}
        {inUpsideDown && <div className="red-pulse"></div>}
      </div>

      {/* Center dot */}
      <div 
        ref={cursorDotRef}
        className={`cursor-dot ${inUpsideDown ? 'upside-down' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{ 
          left: mousePositionRef.current.x,
          top: mousePositionRef.current.y
        }}
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
