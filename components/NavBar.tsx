'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function NavBar() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0.95, 0.85]);
  const blur = useTransform(scrollY, [0, 100], [8, 12]);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setShouldShow(false);
    } else {
      setShouldShow(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: shouldShow ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`
        fixed top-0 left-0 right-0 z-50
        bg-gradient-to-r from-primary-800 via-primary-500 to-primary-800
        shadow-[0_4px_20px_0_rgba(255,217,61,0.3)]
        backdrop-blur-lg
      `}
      style={{ opacity, backdropFilter: `blur(${blur.get()}px)` }}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🌐</span>
          <span className="text-xl font-bold text-white">Web3 Project</span>
        </div>
        <div className="flex items-center space-x-8">
          <a href="#" className="text-white/90 hover:text-white transition-colors">Products</a>
          <a href="#" className="text-white/90 hover:text-white transition-colors">Technology</a>
          <a href="#" className="text-white/90 hover:text-white transition-colors">Community</a>
          <button className="
            bg-white text-primary-700 px-4 py-2 rounded-lg
            hover:bg-primary-50 transition-colors
            font-semibold shadow-md
          ">
            Launch App 🚀
          </button>
        </div>
      </div>
    </motion.nav>
  );
}