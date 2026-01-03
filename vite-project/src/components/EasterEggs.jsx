import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './EasterEggs.css'

const secretMessages = [
  "WILL IS ALIVE",
  "RUN",
  "THE GATE IS OPEN",
  "HE'S COMING",
  "LIGHTS... LIGHTS...",
  "FRIEND DON'T LIE",
  "THE MIND FLAYER SEES ALL",
  "001"
]

const EasterEggs = ({ inUpsideDown }) => {
  const [foundEggs, setFoundEggs] = useState(new Set())
  const [showDemogorgon, setShowDemogorgon] = useState(false)
  const [konamiProgress, setKonamiProgress] = useState(0)
  const [secretMessage, setSecretMessage] = useState(null)
  const [clickCount, setClickCount] = useState(0)

  // Konami code: up up down down left right left right b a
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

  const handleKonami = useCallback((e) => {
    if (e.code === konamiCode[konamiProgress]) {
      const newProgress = konamiProgress + 1
      setKonamiProgress(newProgress)
      
      if (newProgress === konamiCode.length) {
        // Konami code completed!
        setShowDemogorgon(true)
        setFoundEggs(prev => new Set([...prev, 'konami']))
        setKonamiProgress(0)
        
        setTimeout(() => setShowDemogorgon(false), 5000)
      }
    } else {
      setKonamiProgress(0)
    }
  }, [konamiProgress])

  useEffect(() => {
    window.addEventListener('keydown', handleKonami)
    return () => window.removeEventListener('keydown', handleKonami)
  }, [handleKonami])

  // Triple-click anywhere to reveal secret message
  useEffect(() => {
    const handleClick = () => {
      setClickCount(prev => prev + 1)
      
      setTimeout(() => {
        setClickCount(0)
      }, 500)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    if (clickCount >= 3) {
      const message = secretMessages[Math.floor(Math.random() * secretMessages.length)]
      setSecretMessage(message)
      setFoundEggs(prev => new Set([...prev, 'secret-message']))
      setClickCount(0)
      
      setTimeout(() => setSecretMessage(null), 3000)
    }
  }, [clickCount])

  // Random flicker effect
  useEffect(() => {
    if (inUpsideDown) {
      const interval = setInterval(() => {
        if (Math.random() > 0.95) {
          const message = secretMessages[Math.floor(Math.random() * secretMessages.length)]
          setSecretMessage(message)
          setTimeout(() => setSecretMessage(null), 1500)
        }
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [inUpsideDown])

  return (
    <>
      {/* Hidden Demogorgon that appears with Konami code */}
      <AnimatePresence>
        {showDemogorgon && (
          <motion.div 
            className="demogorgon-jumpscare"
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="demogorgon-face">
              <div className="petal p1"></div>
              <div className="petal p2"></div>
              <div className="petal p3"></div>
              <div className="petal p4"></div>
              <div className="petal p5"></div>
              <div className="demogorgon-mouth"></div>
            </div>
            <div className="jumpscare-overlay" />
            <span className="jumpscare-text">THE DEMOGORGON FOUND YOU</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret message flash */}
      <AnimatePresence>
        {secretMessage && (
          <motion.div 
            className="secret-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.5, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, times: [0, 0.1, 0.3, 0.5, 0.7, 1] }}
          >
            <span className="message-text">{secretMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter egg counter (hidden in corner) */}
      {foundEggs.size > 0 && (
        <motion.div 
          className="egg-counter"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="egg-icon">🥚</span>
          <span className="egg-count">{foundEggs.size}/5</span>
        </motion.div>
      )}

      {/* Hidden clickable elements throughout the page */}
      <div 
        className="hidden-egg christmas-lights-egg"
        onClick={() => {
          setFoundEggs(prev => new Set([...prev, 'lights']))
          setSecretMessage("LIGHTS... THEY'RE FLICKERING...")
          setTimeout(() => setSecretMessage(null), 3000)
        }}
      />
    </>
  )
}

export default EasterEggs
