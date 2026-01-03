import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './UpsideDown.css'

const villains = [
  {
    name: 'THE DEMOGORGON',
    title: 'The Predator',
    description: 'A terrifying creature from the Upside Down. It hunts by sensing blood and sound. Its face opens like a deadly flower, revealing rows of razor-sharp teeth.',
    abilities: ['Blood Sensing', 'Dimension Travel', 'Superhuman Strength'],
    threat: 'EXTREME',
    image: '/images/demogorgon.jpg'
  },
  {
    name: 'THE MIND FLAYER',
    title: 'The Shadow Monster',
    description: 'An ancient entity of immense power. It commands the hive mind of the Upside Down, possessing and controlling its victims like puppets.',
    abilities: ['Hive Mind Control', 'Possession', 'Reality Manipulation'],
    threat: 'CATASTROPHIC',
    image: '/images/mindflayer.jpg'
  },
  {
    name: 'VECNA',
    title: 'The Nightmare',
    description: 'Once known as Henry Creel, now transformed into the ultimate evil. He kills by trapping victims in their darkest memories and breaking their minds.',
    abilities: ['Psychic Torture', 'Telekinesis', 'Mind Invasion'],
    threat: 'APOCALYPTIC',
    image: '/images/vecna.jpg'
  }
]

const UpsideDown = ({ onExit }) => {
  const [lightningFlash, setLightningFlash] = useState(false)

  useEffect(() => {
    // Random lightning flashes
    const triggerLightning = () => {
      setLightningFlash(true)
      setTimeout(() => setLightningFlash(false), 150)
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerLightning()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className={`upside-down ${lightningFlash ? 'lightning' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Ash/spore particles floating up */}
      <div className="ash-particles">
        {[...Array(80)].map((_, i) => (
          <div key={i} className="ash" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            '--size': `${2 + Math.random() * 4}px`
          }} />
        ))}
      </div>

      {/* Organic membrane/web covering */}
      <div className="organic-web">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="web-strand" style={{
            left: `${i * 7}%`,
            height: `${100 + Math.random() * 200}px`,
            animationDelay: `${i * 0.2}s`
          }} />
        ))}
      </div>

      {/* Hanging vines/tendrils from top */}
      <div className="hanging-vines">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="hanging-vine" style={{
            left: `${i * 5}%`,
            height: `${80 + Math.random() * 250}px`,
            animationDelay: `${i * 0.15}s`,
            '--thickness': `${3 + Math.random() * 8}px`
          }} />
        ))}
      </div>

      {/* Bottom organic growth */}
      <div className="floor-growth">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="growth-tendril" style={{
            left: `${i * 4}%`,
            height: `${50 + Math.random() * 150}px`,
            animationDelay: `${i * 0.1}s`
          }} />
        ))}
      </div>

      {/* Fog layers */}
      <div className="fog-container">
        <div className="fog fog-1"></div>
        <div className="fog fog-2"></div>
        <div className="fog fog-3"></div>
      </div>

      {/* Electric storm in background */}
      <div className="storm-bg">
        <div className="lightning-bolt bolt-1"></div>
        <div className="lightning-bolt bolt-2"></div>
        <div className="lightning-bolt bolt-3"></div>
      </div>

      <motion.div 
        className="upside-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 className="upside-title">THE UPSIDE DOWN</h1>
        <p className="upside-text">
          You've entered the shadow dimension. A dark reflection of our world, 
          ruled by the Mind Flayer. The air is toxic, reality is twisted, 
          and creatures lurk in every shadow.
        </p>

        {/* Villains Section */}
        <motion.div 
          className="villains-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className="villains-title">CREATURES OF THE DARK</h2>
          <div className="villains-grid">
            {villains.map((villain, index) => (
              <motion.div 
                key={index}
                className="villain-card"
                initial={{ opacity: 0, scale: 0.8, rotateX: -25 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  rotateX: 0,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                viewport={{ once: false, margin: "-100px" }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="villain-image-container"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  whileInView={{ 
                    clipPath: "inset(0% 0% 0% 0%)",
                    transition: { duration: 1, delay: index * 0.15 + 0.2 }
                  }}
                  viewport={{ once: false }}
                >
                  <motion.div 
                    className="villain-image"
                    style={{ backgroundImage: `url(${villain.image})` }}
                    initial={{ scale: 1.3 }}
                    whileInView={{ 
                      scale: 1,
                      transition: { duration: 1.5, delay: index * 0.15 + 0.3 }
                    }}
                    viewport={{ once: false }}
                  />
                  <div className="villain-image-overlay" />
                  <motion.div 
                    className={`threat-badge threat-${villain.threat.toLowerCase()}`}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.5, delay: index * 0.15 + 0.8 }
                    }}
                    viewport={{ once: false }}
                  >
                    {villain.threat}
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="villain-content"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.15 + 0.5 }
                  }}
                  viewport={{ once: false }}
                >
                  <motion.h3 
                    className="villain-name"
                    initial={{ opacity: 0 }}
                    whileInView={{ 
                      opacity: [0, 1, 0.7, 1],
                      transition: { duration: 0.8, delay: index * 0.15 + 0.6 }
                    }}
                    viewport={{ once: false }}
                  >
                    {villain.name}
                  </motion.h3>
                  <motion.span 
                    className="villain-subtitle"
                    initial={{ opacity: 0, letterSpacing: "0.5em" }}
                    whileInView={{ 
                      opacity: 1, 
                      letterSpacing: "0.2em",
                      transition: { duration: 0.7, delay: index * 0.15 + 0.7 }
                    }}
                    viewport={{ once: false }}
                  >
                    {villain.title}
                  </motion.span>
                  <motion.p 
                    className="villain-description"
                    initial={{ opacity: 0 }}
                    whileInView={{ 
                      opacity: 1,
                      transition: { duration: 0.6, delay: index * 0.15 + 0.8 }
                    }}
                    viewport={{ once: false }}
                  >
                    {villain.description}
                  </motion.p>
                  
                  <motion.div 
                    className="villain-abilities"
                    initial={{ opacity: 0 }}
                    whileInView={{ 
                      opacity: 1,
                      transition: { duration: 0.5, delay: index * 0.15 + 0.9 }
                    }}
                    viewport={{ once: false }}
                  >
                    {villain.abilities.map((ability, i) => (
                      <motion.span 
                        key={i} 
                        className="ability-tag"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ 
                          opacity: 1, 
                          scale: 1,
                          transition: { 
                            duration: 0.3, 
                            delay: index * 0.15 + 1 + i * 0.1 
                          }
                        }}
                        viewport={{ once: false }}
                      >
                        {ability}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>

                <div className="villain-glow" />
                <div className="villain-veins">
                  <motion.div 
                    className="vein-line v1"
                    initial={{ scaleY: 0 }}
                    whileInView={{ 
                      scaleY: 1,
                      transition: { duration: 0.8, delay: index * 0.15 + 0.4 }
                    }}
                    viewport={{ once: false }}
                  />
                  <motion.div 
                    className="vein-line v2"
                    initial={{ scaleY: 0 }}
                    whileInView={{ 
                      scaleY: 1,
                      transition: { duration: 1, delay: index * 0.15 + 0.5 }
                    }}
                    viewport={{ once: false }}
                  />
                  <motion.div 
                    className="vein-line v3"
                    initial={{ scaleX: 0 }}
                    whileInView={{ 
                      scaleX: 1,
                      transition: { duration: 0.7, delay: index * 0.15 + 0.6 }
                    }}
                    viewport={{ once: false }}
                  />
                </div>
                
                {/* Creepy glitch overlay */}
                <motion.div 
                  className="glitch-overlay"
                  initial={{ opacity: 0 }}
                  whileInView={{ 
                    opacity: [0, 0.5, 0],
                    transition: { 
                      duration: 0.3, 
                      delay: index * 0.15 + 0.2,
                      repeat: 2,
                      repeatDelay: 0.1
                    }
                  }}
                  viewport={{ once: false }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button 
          className="exit-btn"
          onClick={onExit}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 100, 100, 0.6)" }}
          whileTap={{ scale: 0.95 }}
        >
          Escape to Hawkins
        </motion.button>
      </motion.div>

      {/* Toxic atmosphere overlay */}
      <div className="toxic-overlay"></div>
      
      {/* Scan lines */}
      <div className="scan-lines"></div>

      {/* Vignette */}
      <div className="vignette"></div>
    </motion.div>
  )
}

export default UpsideDown
