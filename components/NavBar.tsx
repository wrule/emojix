'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function NavBar() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const blur = useTransform(scrollY, [0, 100], [0, 8]);

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
        bg-gradient-to-r from-primary-100/80 via-primary-200/80 to-primary-100/80
        backdrop-blur-lg shadow-lg
      `}
      style={{ opacity, backdropFilter: `blur(${blur.get()}px)` }}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🌐</span>
          <span className="text-xl font-bold text-primary-900">Web3 Project</span>
        </div>
        <div className="flex items-center space-x-8">
          <a href="#" className="text-primary-800 hover:text-primary-950 transition-colors">Products</a>
          <a href="#" className="text-primary-800 hover:text-primary-950 transition-colors">Technology</a>
          <a href="#" className="text-primary-800 hover:text-primary-950 transition-colors">Community</a>
          <button className="
            bg-primary-600 text-white px-4 py-2 rounded-lg
            hover:bg-primary-700 transition-colors
          ">
            Launch App 🚀
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
