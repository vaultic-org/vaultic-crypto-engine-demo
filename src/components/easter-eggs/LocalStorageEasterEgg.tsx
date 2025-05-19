import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorageEasterEgg } from '@/hooks/useLocalStorageEasterEgg';
import { useState, useEffect } from 'react';

/**
 * Component that displays an easter egg across the platform
 * when the user has added a secret in localStorage
 */
function LocalStorageEasterEgg() {
  const isEasterEggActive = useLocalStorageEasterEgg();
  const [showCongrats, setShowCongrats] = useState(true);
  
  // Auto-hide congratulation message after 6 seconds
  useEffect(() => {
    if (isEasterEggActive && showCongrats) {
      const timer = setTimeout(() => {
        setShowCongrats(false);
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [isEasterEggActive, showCongrats]);

  // Generate random positions for the confetti
  const generateConfetti = (count: number) => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      x: Math.random() * 100, // Horizontal position in percentage
      size: Math.random() * 0.6 + 0.4, // Size between 0.4 and 1
      color: `hsl(${Math.random() * 360}, 80%, 60%)`, // Random color
      delay: Math.random() * 3, // Start delay
      duration: Math.random() * 4 + 3 // Duration between 3 and 7 seconds
    }));
  };

  const confetti = generateConfetti(40);

  return (
    <AnimatePresence>
      {isEasterEggActive && (
        <>
          {/* Overlay that covers the entire application */}    
          <div className="fixed inset-0 z-[999] pointer-events-none overflow-hidden">
            {/* Badge of admin mode positioned in the bottom left */}
            <motion.div 
              className="fixed bottom-8 left-8 bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-white font-bold py-2 px-6 rounded-full shadow-lg z-50 pointer-events-none border-2 border-white flex items-center"
              initial={{ x: -100, opacity: 0, scale: 0.5 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -100, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.5 }}
            >
              <span className="text-lg mr-2">🔑</span>
              <span className="mr-2">ADMIN MODE ACTIVATED</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-3 h-3 bg-green-400 rounded-full inline-block"
              />
            </motion.div>
            
            {/* Improved confetti animation */}
            <div className="absolute inset-0 pointer-events-none">
              {confetti.map((item) => (
                <motion.div
                  key={item.id}
                  className="absolute rounded-md"
                  style={{ 
                    left: `${item.x}%`,
                    width: `${item.size * 12}px`,
                    height: `${item.size * 12}px`,
                    backgroundColor: item.color,
                    zIndex: 10
                  }}
                  initial={{ 
                    y: -50,
                    rotate: 0,
                    opacity: 1
                  }}
                  animate={{ 
                    y: `calc(100vh + 100px)`,
                    rotate: Math.random() > 0.5 ? 360 : -360,
                    opacity: [1, 1, 1, 0],
                    x: `calc(${item.x}% + ${(Math.random() * 100) - 50}px)`
                  }}
                  transition={{ 
                    duration: item.duration,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: [0.1, 0.25, 0.3, 1]
                  }}
                />
              ))}
            </div>
            
            {/* Initial flash more impressive */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 pointer-events-none"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            />
            
            {/* Pulsating circles */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="absolute rounded-full bg-blue-500 bg-opacity-20"
                initial={{ width: 0, height: 0 }}
                animate={{ 
                  width: ['0%', '150%'],
                  height: ['0%', '150%'],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
              <motion.div
                className="absolute rounded-full bg-purple-500 bg-opacity-20"
                initial={{ width: 0, height: 0 }}
                animate={{ 
                  width: ['0%', '150%'],
                  height: ['0%', '150%'],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 3,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </div>
            
            {/* Secret message moved to top right and auto-hides */}
            <AnimatePresence>
              {showCongrats && (
                <motion.div
                  className="fixed top-20 right-8 max-w-xs bg-black bg-opacity-80 text-green-400 font-mono p-4 rounded-md shadow-2xl z-50 pointer-events-none border border-green-500"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="text-base">
                    <span className="text-yellow-400">Congratulations!</span> You have discovered the <span className="text-pink-400">secret admin mode</span>. 🚀
                    <motion.div 
                      className="text-blue-300 mt-1 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      Access exclusive features. Look around you...
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default LocalStorageEasterEgg; 