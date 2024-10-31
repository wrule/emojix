'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const emojis = [
  '😊', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸',
  '🌈', '🌟', '✨', '💫', '⭐', '🔥', '💖', '💫'
]

export default function Title() {
  const [isHovered, setIsHovered] = useState(false)
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const newEmoji = emojis[Math.floor(Math.random() * emojis.length)]
      setCurrentEmoji(newEmoji)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const letters = "EMOJIX".split("")

  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-3xl">😂</span>
      <motion.div
        className="flex items-center text-4xl font-bold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
            }}
            className="tracking-wider inline-block"
          >
            {letter}
          </motion.span>
        ))}
        <motion.div
          className="inline-flex items-center justify-center ml-2"
          animate={{
            y: isHovered ? 0 : [0, -3, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEmoji}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: isHovered ? 1.2 : 1,
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut"
              }}
              className="text-4xl"
              style={{
                transform: 'translate3d(0, 0, 0)',
                willChange: 'transform',
              }}
            >
              {currentEmoji}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}