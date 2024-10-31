'use client'

import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import ConnectButton from './ConnectButton'
import Title from './Title'

export default function NavHeader() {
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const scrollingUp = currentScrollY < lastScrollY
    const scrollingDown = currentScrollY > lastScrollY
    const isAtTop = currentScrollY < 50

    if (isAtTop) {
      setIsVisible(true)
    } 
    else if (scrollingUp && !isVisible) {
      setIsVisible(true)
    } 
    else if (scrollingDown && isVisible && currentScrollY > 100) {
      setIsVisible(false)
    }

    setLastScrollY(currentScrollY)
  }, [lastScrollY, isVisible])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined

    const throttledScroll = () => {
      if (timeoutId) return

      timeoutId = setTimeout(() => {
        handleScroll()
        timeoutId = undefined
      }, 100)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [handleScroll])

  const emojiVariants = {
    initial: {
      rotate: 0,
      y: 0
    },
    hover: {
      rotate: [0, -10, 10, -10, 0],
      y: [-1, 1, -1],
      transition: {
        rotate: {
          duration: 0.4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        },
        y: {
          duration: 0.4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    }
  }

  const NavItem = ({ emoji, text }: { emoji: string; text: string }) => (
    <motion.div 
      whileHover="hover"
      whileTap="tap"
      initial="initial"
      className="relative"
    >
      <motion.div 
        className="px-4 py-2 rounded-full text-primary-300 
                   overflow-hidden transform-gpu cursor-pointer group"
      >
        <motion.div
          initial={{ opacity: 0 }}
          variants={{
            hover: { opacity: 1 },
            initial: { opacity: 0 }
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-r from-[#FFE14D] to-[#FFD700] transform-gpu"
        />
        
        <div className="relative z-10">
          <motion.span 
            variants={emojiVariants}
            className="inline-block"
            style={{
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "antialiased",
              transform: "translateZ(0)"
            }}
          >
            {emoji}
          </motion.span>
          <span className="ml-2 font-medium transition-colors duration-200 
                         group-hover:text-[#1a1b1f]">
            {text}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          style={{
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
            transform: "translateZ(0)"
          }}
          className="fixed top-0 left-0 right-0 z-50 transform-gpu"
        >
          <div className="backdrop-blur-sm bg-space-800/80 transform-gpu">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <Title />
              
              <div className="flex items-center space-x-4">
                <NavItem emoji="🏠" text="Home" />
                <NavItem emoji="💱" text="Swap" />
                <NavItem emoji="🎯" text="GIF" />
                <NavItem emoji="📚" text="Docs" />
                <NavItem emoji="💡" text="About" />
                <ConnectButton />
              </div>
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}