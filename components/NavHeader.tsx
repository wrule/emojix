'use client'

import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

export default function NavHeader() {
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // 使用节流来优化滚动处理
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const scrollingUp = currentScrollY < lastScrollY
    const scrollingDown = currentScrollY > lastScrollY
    const isAtTop = currentScrollY < 50

    // 在顶部时总是显示
    if (isAtTop) {
      setIsVisible(true)
    } 
    // 向上滚动时显示
    else if (scrollingUp && !isVisible) {
      setIsVisible(true)
    } 
    // 向下滚动超过一定距离时隐藏
    else if (scrollingDown && isVisible && currentScrollY > 100) {
      setIsVisible(false)
    }

    setLastScrollY(currentScrollY)
  }, [lastScrollY, isVisible])

  useEffect(() => {
    // 修改类型定义
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined

    const throttledScroll = () => {
      if (timeoutId) return

      timeoutId = setTimeout(() => {
        handleScroll()
        timeoutId = undefined // 使用 undefined 代替 null
      }, 100)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [handleScroll])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            duration: 0.3,
            ease: 'easeInOut'
          }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="backdrop-blur-sm bg-space-800/80 transform-gpu">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌟</span>
                <span className="text-primary-500 font-bold text-xl">Web3 Project</span>
              </div>
              
              <div className="flex items-center space-x-8">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-primary-300 hover:text-primary-500 transition-colors"
                >
                  🏠 Home
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-primary-300 hover:text-primary-500 transition-colors"
                >
                  📚 Docs
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-primary-300 hover:text-primary-500 transition-colors"
                >
                  💡 About
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-500 hover:bg-primary-600 text-space-900 px-4 py-2 rounded-lg transition-colors"
                >
                  🦊 Connect Wallet
                </motion.button>
              </div>
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}