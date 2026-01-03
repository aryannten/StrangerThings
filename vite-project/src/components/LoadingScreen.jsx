import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const LoadingScreen = ({ onLoadComplete }) => {
  const [loadingPhase, setLoadingPhase] = useState(0)
  const [loadingText, setLoadingText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  
  const loadingMessages = [
    'INITIALIZING...',
    'CONNECTING TO HAWKINS LAB...',
    'DETECTING ANOMALIES...',
    'OPENING GATE...',
    'WELCOME'
  ]

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
    }, 50)

    return () => clearInterval(typeInterval)
  }, [loadingPhase])

  useEffect(() => {
    // Progress through loading phases
    const phaseTimings = [800, 1500, 2200, 2900, 3600]
    
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
      setTimeout(onLoadComplete, 800)
    }, 4500)
  }, [onLoadComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Flickering background */}
          <div className="loading-flicker" />
          
          {/* VHS noise */}
          <div className="loading-noise" />
          
          {/* Scan lines */}
          <div className="loading-scanlines" />
          
          {/* Central logo */}
          <motion.div 
            className="loading-logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="loading-title">
              <span className="title-line">STRANGER</span>
              <span className="title-line">THINGS</span>
            </h1>
          </motion.div>

          {/* Loading text with typewriter */}
          <div className="loading-text-container">
            <span className="loading-text">{loadingText}</span>
            <span className="loading-cursor">_</span>
          </div>

          {/* Progress bar */}
          <div className="loading-progress-container">
            <motion.div 
              className="loading-progress-bar"
              initial={{ width: '0%' }}
              animate={{ width: `${(loadingPhase + 1) * 20}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Floating particles */}
          <div className="loading-particles">
            {[...Array(30)].map((_, i) => (
              <div 
                key={i} 
                className="loading-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>

          {/* Corner decorations */}
          <div className="loading-corner top-left" />
          <div className="loading-corner top-right" />
          <div className="loading-corner bottom-left" />
          <div className="loading-corner bottom-right" />

          {/* Flickering lights */}
          <div className="loading-lights">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="christmas-light"
                style={{
                  left: `${10 + i * 11}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
