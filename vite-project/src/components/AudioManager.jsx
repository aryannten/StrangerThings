import React, { useEffect, useRef, useState } from 'react'

const AudioManager = ({ inUpsideDown }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const themeRef = useRef(null)
  const ambientRef = useRef(null)
  const hoverSoundRef = useRef(null)
  const clickSoundRef = useRef(null)

  useEffect(() => {
    // Initialize audio elements
    themeRef.current = new Audio('/sounds/stranger-things-theme.mp3')
    ambientRef.current = new Audio('/sounds/upside-down-ambient.mp3')
    hoverSoundRef.current = new Audio('/sounds/hover.mp3')
    clickSoundRef.current = new Audio('/sounds/click.mp3')

    themeRef.current.loop = true
    themeRef.current.volume = 0.3
    ambientRef.current.loop = true
    ambientRef.current.volume = 0.4
    hoverSoundRef.current.volume = 0.2
    clickSoundRef.current.volume = 0.3

    setIsLoaded(true)

    // Auto-play on first user interaction
    const startAudio = () => {
      if (!inUpsideDown) {
        themeRef.current?.play().catch(() => {})
      }
      document.removeEventListener('click', startAudio)
    }
    document.addEventListener('click', startAudio)

    return () => {
      themeRef.current?.pause()
      ambientRef.current?.pause()
      document.removeEventListener('click', startAudio)
    }
  }, [])

  // Handle world switching
  useEffect(() => {
    if (!isLoaded) return

    if (inUpsideDown) {
      themeRef.current?.pause()
      ambientRef.current?.play().catch(() => {})
    } else {
      ambientRef.current?.pause()
      themeRef.current?.play().catch(() => {})
    }
  }, [inUpsideDown, isLoaded])

  // Global sound effects for buttons
  useEffect(() => {
    const playHover = () => {
      if (hoverSoundRef.current) {
        hoverSoundRef.current.currentTime = 0
        hoverSoundRef.current.play().catch(() => {})
      }
    }

    const playClick = () => {
      if (clickSoundRef.current) {
        clickSoundRef.current.currentTime = 0
        clickSoundRef.current.play().catch(() => {})
      }
    }

    const buttons = document.querySelectorAll('button, .character-card, .villain-card')
    
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', playHover)
      btn.addEventListener('click', playClick)
    })

    return () => {
      buttons.forEach(btn => {
        btn.removeEventListener('mouseenter', playHover)
        btn.removeEventListener('click', playClick)
      })
    }
  }, [inUpsideDown])

  // No UI - audio plays automatically
  return null
}

export default AudioManager
