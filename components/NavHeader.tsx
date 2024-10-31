'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function NavHeader() {
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  // 控制显隐的透明度动画
  const opacity = useTransform(
    scrollY,
    [0, 50],
    [1, isVisible ? 1 : 0]
  )

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY <= 50 || currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <motion.header
      style={{ opacity }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-space-800/80"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🌟</span>
          <span className="text-primary-500 font-bold text-xl">Web3 Project</span>
        </div>
        
        <div className="flex items-center space-x-8">
          <button className="text-primary-300 hover:text-primary-500 transition-colors">
            🏠 Home
          </button>
          <button className="text-primary-300 hover:text-primary-500 transition-colors">
            📚 Docs
          </button>
          <button className="text-primary-300 hover:text-primary-500 transition-colors">
            💡 About
          </button>
          <button className="bg-primary-500 hover:bg-primary-600 text-space-900 px-4 py-2 rounded-lg transition-colors">
            🦊 Connect Wallet
          </button>
        </div>
      </nav>
    </motion.header>
  )
}