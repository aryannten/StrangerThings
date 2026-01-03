import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const LoadingScreen = ({ onLoadComplete }) => {
  const [loadingPhase, setLoadingPhase] = useState(0)
  const [loadingText, setLoadingText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [lightningFlash, setLightningFlash] = useState(false)
  
  const loadingMessages = [
    'NOVEMBER 6, 1983',
    'HAWKINS, INDIANA',
    'SOMETHING IS COMING...',
    'THE GATE IS OPENING',
    'ENTER THE UPSIDE DOWN'
  ]

  // Lightning effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLightningFlash(true)
        setTimeout(() => setLightningFlash(false), 100)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Typewriter effect for loading text
    const message = loadingMessages[loadingPhase]
    let charIndex = 0
    setLoadingText('')

    const typeInterval = setInterval(() => {
      if (charIndex < message.length) {
        setLoadingText(prev => prev + message[charIndex])
        charIndex++
      } else {
        clearInterval(typeInterval)
      }
    }, 60)

    return () => clearInterval(typeInterval)
  }, [loadingPhase])

  useEffect(() => {
    // Progress through loading phases
    const phaseTimings = [1200, 2400, 3800, 5200, 6400]
    
    phaseTimings.forEach((time, index) => {
      setTimeout(() => {
        if (index < loadingMessages.length - 1) {
          setLoadingPhase(index + 1)
        }
      }, time)
    })

    // Complete loading
    setTimeout(() => {
      setIsComplete(true)
      setTimeout(onLoadComplete, 1000)
    }, 7500)
  }, [onLoadComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          className={`loading-screen ${lightningFlash ? 'lightning' : ''} phase-${loadingPhase}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* Animated background layers */}
          <div className="loading-bg-layer layer-1" />
          <div className="loading-bg-layer layer-2" />
          <div className="loading-bg-layer layer-3" />
          
          {/* Forest silhouette */}
          <div className="forest-silhouette">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="tree"
                style={{
                  left: `${i * 5}%`,
                  height: `${80 + Math.random() * 120}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
          
          {/* VHS noise */}
          <div className="loading-noise" />
          
          {/* Scan lines */}
          <div className="loading-scanlines" />

          {/* Floating spores/particles */}
          <div className="loading-spores">
            {[...Array(50)].map((_, i) => (
              <div 
                key={i} 
                className="spore"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 6}s`,
                  '--size': `${2 + Math.random() * 6}px`
                }}
              />
            ))}
          </div>

          {/* Organic tendrils from edges */}
          <div className="loading-tendrils">
            {[...Array(12)].map((_, i) => (
              <motion.div 
                key={i} 
                className="tendril"
                style={{
                  '--index': i,
                  '--rotation': `${(i * 30) - 180}deg`
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: loadingPhase >= 3 ? 1 : 0 }}
                transition={{ delay: i * 0.1, duration: 1.5 }}
              />
            ))}
          </div>
          
          {/* Central content */}
          <div className="loading-center">
            {/* Glowing orb/gate */}
            <motion.div 
              className="gate-orb"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: loadingPhase >= 2 ? 1 : 0.3,
                opacity: loadingPhase >= 2 ? 1 : 0.3
              }}
              transition={{ duration: 1.5, type: 'spring' }}
            >
              <div className="orb-core" />
              <div className="orb-ring ring-1" />
              <div className="orb-ring ring-2" />
              <div className="orb-ring ring-3" />
              <div className="orb-pulse" />
            </motion.div>

            {/* Logo */}
            <motion.div 
              className="loading-logo"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="loading-title">
                <motion.span 
                  className="title-line"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  STRANGER
                </motion.span>
                <motion.span 
                  className="title-line"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  THINGS
                </motion.span>
              </h1>
            </motion.div>

            {/* Loading text with typewriter */}
            <motion.div 
              className="loading-text-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="loading-text">{loadingText}</span>
              <span className="loading-cursor">▌</span>
            </motion.div>

            {/* Phase indicators */}
            <div className="phase-indicators">
              {loadingMessages.map((_, i) => (
                <motion.div 
                  key={i}
                  className={`phase-dot ${i <= loadingPhase ? 'active' : ''}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Christmas lights string */}
          <div className="lights-string">
            <svg className="string-line" viewBox="0 0 1000 50">
              <path d="M0,25 Q250,45 500,25 T1000,25" fill="none" stroke="rgba(50,50,50,0.8)" strokeWidth="2"/>
            </svg>
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="christmas-light"
                style={{
                  left: `${5 + i * 8}%`,
                  top: `${20 + Math.sin(i * 0.5) * 15}px`,
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>

          {/* Alphabet wall hint */}
          <motion.div 
            className="alphabet-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: loadingPhase >= 1 ? 0.6 : 0 }}
            transition={{ duration: 1 }}
          >
            <span className="alphabet-letter">R</span>
            <span className="alphabet-letter">U</span>
            <span className="alphabet-letter">N</span>
          </motion.div>

          {/* Corner decorations */}
          <div className="loading-corner top-left">
            <span className="corner-text">HAWKINS LAB</span>
          </div>
          <div className="loading-corner top-right">
            <span className="corner-text">CLASSIFIED</span>
          </div>
          <div className="loading-corner bottom-left">
            <span className="corner-text">PROJECT INDIGO</span>
          </div>
          <div className="loading-corner bottom-right">
            <span className="corner-text">DR. BRENNER</span>
          </div>

          {/* Demogorgon silhouette at final phase */}
          <motion.div 
            className="demogorgon-shadow"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: loadingPhase >= 4 ? 0.3 : 0,
              scale: loadingPhase >= 4 ? 1 : 0.5
            }}
            transition={{ duration: 2 }}
          />

          {/* Vignette */}
          <div className="loading-vignette" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
