
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import Hero from './components/Hero'
import Characters from './components/Characters'
import UpsideDown from './components/UpsideDown'
import SeasonsTimeline from './components/SeasonsTimeline'
// Audio removed
import CustomCursor from './components/CustomCursor'
import VHSFilter from './components/VHSFilter'
import LoadingScreen from './components/LoadingScreen'
// StickyNavbar removed
import EasterEggs from './components/EasterEggs'

function App() {
  const [inUpsideDown, setInUpsideDown] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionPhase, setTransitionPhase] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const enterUpsideDown = () => {
    setIsTransitioning(true)
    setTransitionPhase(1) // Lights flicker
    
    setTimeout(() => setTransitionPhase(2), 1500) // Portal opens
    setTimeout(() => setTransitionPhase(3), 3500) // Getting pulled in
    setTimeout(() => setTransitionPhase(4), 5500) // Full darkness
    setTimeout(() => {
      setInUpsideDown(true)
      setIsTransitioning(false)
      setTransitionPhase(0)
    }, 7000)
  }

  const exitUpsideDown = () => {
    setIsTransitioning(true)
    setTransitionPhase(4)
    
    setTimeout(() => setTransitionPhase(3), 1000)
    setTimeout(() => setTransitionPhase(2), 2500)
    setTimeout(() => setTransitionPhase(1), 4000)
    setTimeout(() => {
      setInUpsideDown(false)
      setIsTransitioning(false)
      setTransitionPhase(0)
    }, 5500)
  }

  // Show loading screen initially
  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
  }

  return (
    <>
      {/* Custom Cursor - disabled on hero page */}
      {inUpsideDown && <CustomCursor inUpsideDown={inUpsideDown} />}
      
      {/* VHS Filter Overlay */}
      <VHSFilter intensity={0.8} inUpsideDown={inUpsideDown} />
      

      

      
      {/* Easter Eggs */}
      <EasterEggs inUpsideDown={inUpsideDown} />

      {/* Horror Portal Transition */}
      <AnimatePresence>
        {isTransitioning && (
          <div className={`portal-overlay phase-${transitionPhase}`}>
            {/* Flickering light effect */}
            <div className="flicker-layer" />
            
            {/* The organic portal - flesh tear in reality */}
            <div className="portal-container">
              <div className="portal-membrane">
                <div className="membrane-layer layer-1"></div>
                <div className="membrane-layer layer-2"></div>
                <div className="membrane-layer layer-3"></div>
                <div className="membrane-layer layer-4"></div>
              </div>
              <div className="portal-tear">
                <div className="tear-edge left"></div>
                <div className="tear-edge right"></div>
                <div className="tear-glow"></div>
                <div className="tear-void"></div>
              </div>
              <div className="organic-tendrils">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="organic-tendril" style={{ 
                    '--rotation': `${i * 22.5}deg`,
                    '--delay': `${i * 0.08}s`,
                    '--length': `${150 + Math.random() * 100}px`
                  }} />
                ))}
              </div>
              <div className="dripping-matter">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="drip" style={{
                    left: `${30 + i * 5}%`,
                    animationDelay: `${i * 0.3}s`
                  }} />
                ))}
              </div>
            </div>

            {/* Organic veins spreading */}
            <div className="veins-container">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="vein" style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.15}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }} />
              ))}
            </div>

            {/* Floating particles/spores */}
            <div className="spores">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="spore" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }} />
              ))}
            </div>

            {/* Distortion overlay */}
            <div className="distortion-layer" />

            {/* Text messages */}
            <div className="portal-text">
              {transitionPhase === 1 && <span className="glitch-text">THE LIGHTS...</span>}
              {transitionPhase === 2 && <span className="glitch-text">IT'S OPENING...</span>}
              {transitionPhase === 3 && <span className="glitch-text">DON'T LOOK BACK</span>}
              {transitionPhase === 4 && <span className="glitch-text">WELCOME TO THE UPSIDE DOWN</span>}
            </div>
          </div>
        )}
      </AnimatePresence>

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
    </>
  )
}

export default App
