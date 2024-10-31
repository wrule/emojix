'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

// Header组件将是客户端组件，因为需要处理滚动事件
const Header = () => {
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0])
  const headerTranslateY = useTransform(scrollY, [0, 100], [0, -100])

  return (
    <motion.header
      style={{ opacity: headerOpacity, y: headerTranslateY }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary-100"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary-800">🌐 Web3Project</div>
        <nav className="space-x-6">
          <a href="#" className="text-primary-900 hover:text-primary-700">🏠 Home</a>
          <a href="#" className="text-primary-900 hover:text-primary-700">📚 Docs</a>
          <a href="#" className="text-primary-900 hover:text-primary-700">🤝 Community</a>
          <a href="#" className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600">
            🚀 Launch App
          </a>
        </nav>
      </div>
    </motion.header>
  )
}

// Footer组件是静态的，可以保持在服务端
const Footer = () => (
  <footer className="bg-primary-50 border-t border-primary-100">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-primary-900 mb-4">🌐 Web3Project</h3>
          <p className="text-primary-800">Building the future of decentralized web.</p>
        </div>
        <div>
          <h4 className="font-semibold text-primary-900 mb-4">Products</h4>
          <ul className="space-y-2 text-primary-800">
            <li>📱 App</li>
            <li>🔧 Tools</li>
            <li>📊 Analytics</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary-900 mb-4">Resources</h4>
          <ul className="space-y-2 text-primary-800">
            <li>📑 Documentation</li>
            <li>📖 Blog</li>
            <li>❓ FAQ</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary-900 mb-4">Community</h4>
          <ul className="space-y-2 text-primary-800">
            <li>🐦 Twitter</li>
            <li>💬 Discord</li>
            <li>📱 Telegram</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-primary-100 text-center text-primary-700">
        © {new Date().getFullYear()} Web3Project. All rights reserved.
      </div>
    </div>
  </footer>
)

// 主页面组件
export default function Web3Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16">
        {/* 内容区占位，实际使用时替换为真实内容 */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="space-y-24">
            <section className="text-center">
              <h1 className="text-5xl font-bold text-primary-900 mb-6">
                Welcome to the Future of Web3
              </h1>
              <p className="text-xl text-primary-800 max-w-2xl mx-auto">
                Building the next generation of decentralized applications with cutting-edge technology.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { emoji: '🚀', title: 'Fast & Scalable', desc: 'Built for the modern web' },
                { emoji: '🔒', title: 'Secure', desc: 'Enterprise-grade security' },
                { emoji: '🌐', title: 'Decentralized', desc: 'Truly trustless system' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors"
                >
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">{item.title}</h3>
                  <p className="text-primary-800">{item.desc}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}