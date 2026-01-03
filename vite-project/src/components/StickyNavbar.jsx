import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './StickyNavbar.css'

const StickyNavbar = ({ inUpsideDown, onEnterUpsideDown, onExitUpsideDown }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      // Add background when scrolled
      setIsScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav 
      className={`sticky-navbar ${isScrolled ? 'scrolled' : ''} ${inUpsideDown ? 'upside-down-mode' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <motion.div 
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="logo-text">STRANGER</span>
          <span className="logo-text">THINGS</span>
        </motion.div>

        {/* Navigation links */}
        <div className="navbar-links">
          {!inUpsideDown ? (
            <>
              <motion.button 
                className="nav-link"
                onClick={() => scrollToSection('.hero')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Home
              </motion.button>
              <motion.button 
                className="nav-link"
                onClick={() => scrollToSection('.characters-section')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Characters
              </motion.button>
              <motion.button 
                className="nav-link"
                onClick={() => scrollToSection('.timeline-section')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Timeline
              </motion.button>
              <motion.button 
                className="nav-link enter-btn"
                onClick={onEnterUpsideDown}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 50, 50, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                Enter Upside Down
              </motion.button>
            </>
          ) : (
            <>
              <motion.button 
                className="nav-link"
                onClick={() => scrollToSection('.upside-content')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                The Void
              </motion.button>
              <motion.button 
                className="nav-link"
                onClick={() => scrollToSection('.villains-section')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Creatures
              </motion.button>
              <motion.button 
                className="nav-link exit-btn"
                onClick={onExitUpsideDown}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(100, 150, 255, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                Escape to Hawkins
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button className="mobile-menu-toggle">
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </button>
      </div>

      {/* Decorative line */}
      <div className="navbar-line" />
    </motion.nav>
  )
}

export default StickyNavbar
