
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import Hero from './components/Hero'
import Characters from './components/Characters'
import UpsideDown from './components/UpsideDown'
import SeasonsTimeline from './components/SeasonsTimeline'
// Audio removed
// CustomCursor removed
import VHSFilter from './components/VHSFilter'
import LoadingScreen from './components/LoadingScreen'
// StickyNavbar removed
import EasterEggs from './components/EasterEggs'

function App() {
  const [inUpsideDown, setInUpsideDown] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionPhase, setTransitionPhase] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [shakeIntensity, setShakeIntensity] = useState(0)

  // Screen shake effect during transition
  useEffect(() => {
    if (transitionPhase >= 3) {
      setShakeIntensity(transitionPhase === 3 ? 1 : 2)
    } else {
      setShakeIntensity(0)
    }
  }, [transitionPhase])

  const enterUpsideDown = () => {
    setIsTransitioning(true)
    setTransitionPhase(1) // Lights flicker, power surges
    
    setTimeout(() => setTransitionPhase(2), 1800) // Cracks appear, reality bends
    setTimeout(() => setTransitionPhase(3), 4000) // Portal fully opens, wind pulls
    setTimeout(() => setTransitionPhase(4), 6000) // Crossing over
    setTimeout(() => setTransitionPhase(5), 7500) // Full darkness, emergence
    setTimeout(() => {
      setInUpsideDown(true)
      setIsTransitioning(false)
      setTransitionPhase(0)
    }, 8500)
  }

  const exitUpsideDown = () => {
    setIsTransitioning(true)
    setTransitionPhase(5)
    
    setTimeout(() => setTransitionPhase(4), 1200)
    setTimeout(() => setTransitionPhase(3), 2800)
    setTimeout(() => setTransitionPhase(2), 4200)
    setTimeout(() => setTransitionPhase(1), 5500)
    setTimeout(() => {
      setInUpsideDown(false)
      setIsTransitioning(false)
      setTransitionPhase(0)
    }, 6800)
  }

  // Show loading screen initially
  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
  }

  return (
    <div className={`app-container ${shakeIntensity > 0 ? `shake-${shakeIntensity}` : ''}`}>

      
      {/* VHS Filter Overlay */}
      <VHSFilter intensity={0.8} inUpsideDown={inUpsideDown} />
      
      {/* Easter Eggs */}
      <EasterEggs inUpsideDown={inUpsideDown} />

      {/* Horror Portal Transition - using direct conditional with style to force hide */}
      <div 
        className={`portal-overlay phase-${transitionPhase}`}
        style={{ 
          display: isTransitioning ? 'block' : 'none',
          visibility: isTransitioning ? 'visible' : 'hidden',
          opacity: isTransitioning ? 1 : 0,
          pointerEvents: isTransitioning ? 'auto' : 'none'
        }}
      >
        {/* Flickering light effect */}
        <div className="flicker-layer" />
        
        {/* Reality cracks - before portal opens */}
        <div className="reality-cracks">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="crack"
              style={{
                '--angle': `${i * 30}deg`,
                '--delay': `${i * 0.1}s`,
                '--length': `${150 + i * 15}px`
              }}
            />
          ))}
        </div>

        {/* Lightning strikes */}
        <div className="lightning-container">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="lightning-bolt"
              style={{
                left: `${15 + i * 18}%`,
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>
        
        {/* The organic portal - flesh tear in reality */}
        {transitionPhase >= 2 && isTransitioning && (
          <div className="portal-container">
            <div className="portal-membrane">
              <div className="membrane-layer layer-1"></div>
              <div className="membrane-layer layer-2"></div>
              <div className="membrane-layer layer-3"></div>
              <div className="membrane-layer layer-4"></div>
            </div>
            
            {/* Portal energy rings */}
            <div className="portal-rings">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="energy-ring" style={{ '--i': i }} />
              ))}
            </div>
            
            <div className="portal-tear">
              <div className="tear-edge left"></div>
              <div className="tear-edge right"></div>
              <div className="tear-glow"></div>
              <div className="tear-void">
                <div className="void-depth"></div>
              </div>
            </div>
            
            <div className="organic-tendrils">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="organic-tendril" style={{ 
                  '--rotation': `${i * 18}deg`,
                  '--delay': `${i * 0.05}s`,
                  '--length': `${180 + i * 8}px`
                }} />
              ))}
            </div>
            
            <div className="dripping-matter">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="drip" style={{
                  left: `${20 + i * 5}%`,
                  animationDelay: `${i * 0.2}s`
                }} />
              ))}
            </div>
          </div>
        )}

        {/* Pull effect - objects being sucked in */}
        <div className="pull-particles">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className="pull-particle"
              style={{
                '--startX': `${(i * 2.5) % 100}%`,
                '--startY': `${(i * 7) % 100}%`,
                '--delay': `${(i * 0.05) % 2}s`,
                '--size': `${4 + (i % 8)}px`
              }}
            />
          ))}
        </div>

        {/* Organic veins spreading */}
        <div className="veins-container">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="vein" style={{
              left: `${(i * 4) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animationDelay: `${i * 0.12}s`,
              transform: `rotate(${i * 14.4}deg)`
            }} />
          ))}
        </div>

        {/* Floating particles/spores */}
        <div className="spores">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="spore" style={{
              left: `${(i * 2) % 100}%`,
              animationDelay: `${(i * 0.06) % 3}s`,
              animationDuration: `${3 + (i % 3)}s`
            }} />
          ))}
        </div>

        {/* Distortion overlay */}
        <div className="distortion-layer" />
        
        {/* Chromatic aberration bars */}
        <div className="chromatic-bars">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="chroma-bar" style={{ '--i': i }} />
          ))}
        </div>

        {/* Vignette darkness closing in */}
        <div className="transition-vignette" />

        {/* Text messages with typewriter effect */}
        <div className="portal-text">
          {transitionPhase === 1 && (
            <motion.span 
              className="glitch-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              THE LIGHTS ARE FLICKERING...
            </motion.span>
          )}
          {transitionPhase === 2 && (
            <motion.span 
              className="glitch-text"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              REALITY IS BREAKING
            </motion.span>
          )}
          {transitionPhase === 3 && (
            <motion.span 
              className="glitch-text intense"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              THE GATE IS OPEN
            </motion.span>
          )}
          {transitionPhase === 4 && (
            <motion.span 
              className="glitch-text pulling"
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              CROSSING OVER...
            </motion.span>
          )}
          {transitionPhase === 5 && (
            <motion.span 
              className="glitch-text final"
              initial={{ opacity: 0, letterSpacing: '0.8em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1 }}
            >
              WELCOME TO THE UPSIDE DOWN
            </motion.span>
          )}
        </div>

        {/* Demogorgon shadow emerging */}
        <motion.div 
          className="monster-shadow"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: transitionPhase >= 4 ? 0.6 : 0,
            scale: transitionPhase >= 4 ? 1 : 0.5
          }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {inUpsideDown ? (
          <UpsideDown key="upside" onExit={exitUpsideDown} />
        ) : (
          <motion.div 
            key="normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onEnterUpsideDown={enterUpsideDown} />
            <Characters />
            <SeasonsTimeline />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
