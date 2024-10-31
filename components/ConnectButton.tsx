'use client'

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const emojis = [
  '🦊', '🐱', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵',  // 可爱动物
  '🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎺', '🎵',  // 艺术娱乐
  '🌈', '🌸', '🌺', '🌻', '🍀', '🌹', '🌷', '🌼',  // 自然植物
  '🎈', '🎉', '🎊', '🎁', '🎀', '🎗️', '🏆', '👑',  // 庆祝奖励
  '💎', '💍', '💝', '💖', '💗', '💓', '💞', '💕',  // 珠宝爱心
  '🚀', '✈️', '🛸', '🎡', '🎢', '🌠', '🎆', '🎇'   // 交通游乐
]

const FloatingEmoji = () => {
  const [position] = useState({
    startX: Math.random() * 60 + 100,
    startY: -10,
  })

  return (
    <motion.div
      initial={{ 
        x: position.startX, 
        y: position.startY, 
        opacity: 0,
        scale: Math.random() * 0.5 + 0.5
      }}
      animate={{ 
        x: position.startX - 160,
        y: 60,
        opacity: [0, 0.8, 0],
        rotate: Math.random() * 360
      }}
      transition={{ 
        duration: 2,
        ease: "linear"
      }}
      className="absolute text-xl pointer-events-none text-[#FFE071]"
      style={{
        filter: 'drop-shadow(0 0 8px rgba(255, 224, 113, 0.5))'
      }}
    >
      {emojis[Math.floor(Math.random() * emojis.length)]}
    </motion.div>
  )
}

export default function ConnectButton() {
  const [emojiKeys, setEmojiKeys] = useState<number[]>([])

  useEffect(() => {
    const createEmojis = () => {
      const count = Math.floor(Math.random() * 3) + 6
      const newKeys = Array.from({ length: count }, (_, i) => Date.now() + i)
      setEmojiKeys(newKeys)
    }

    createEmojis()
    const interval = setInterval(createEmojis, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted
        const connected = ready && account && chain

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div className="relative">
                    <motion.button
                      onClick={openConnectModal}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative px-6 py-2.5 rounded-xl w-[160px] whitespace-nowrap overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #FFB800 0%, #FFEE94 100%)',
                        boxShadow: '0 0 10px rgba(255, 224, 113, 0.3)'
                      }}
                    >
                      <span className="relative z-10 font-medium text-[#1F2937]">Connect Wallet</span>
                      <div className="absolute inset-0 overflow-hidden">
                        <AnimatePresence>
                          {emojiKeys.map(key => (
                            <FloatingEmoji key={key} />
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  </div>
                )
              }

              return (
                <div className="flex items-center gap-3">
                  <button
                    onClick={openChainModal}
                    className="bg-[#2172e5]/10 text-[#2172e5] px-4 py-2 rounded-xl flex items-center gap-2"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    className="bg-[#2172e5] text-white px-4 py-2 rounded-xl"
                  >
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </RainbowConnectButton.Custom>
  )
}