import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CharacterModal.css'

const CharacterModal = ({ character, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!character) return null

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="character-modal"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glitch effect overlay */}
          <div className="modal-glitch" />
          
          {/* Close button */}
          <motion.button 
            className="modal-close"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>

          {/* Character image */}
          <div className="modal-image-section">
            <motion.div 
              className="modal-image"
              style={{ backgroundImage: `url(${character.image})` }}
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <div className="modal-image-overlay" />
            <div className="modal-scanlines" />
          </div>

          {/* Character info */}
          <div className="modal-content">
            <motion.span 
              className="modal-nickname"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              "{character.nickname}"
            </motion.span>
            
            <motion.h2 
              className="modal-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {character.name}
            </motion.h2>

            <motion.div 
              className="modal-ability-badge"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              {character.ability}
            </motion.div>

            <motion.blockquote 
              className="modal-quote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {character.quote}
            </motion.blockquote>

            {/* Random quote button */}
            <motion.div 
              className="modal-divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7 }}
            />

            {character.bio && (
              <motion.p 
                className="modal-bio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {character.bio}
              </motion.p>
            )}
          </div>

          {/* Decorative elements */}
          <div className="modal-corner top-left" />
          <div className="modal-corner top-right" />
          <div className="modal-corner bottom-left" />
          <div className="modal-corner bottom-right" />

          {/* Veins growing effect */}
          <div className="modal-veins">
            <div className="vein v1" />
            <div className="vein v2" />
            <div className="vein v3" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CharacterModal
