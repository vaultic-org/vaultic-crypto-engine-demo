import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'white';
  fullScreen?: boolean;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'blue',
  fullScreen = false 
}) => {
  // Déterminer la taille du spinner
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  // Déterminer la couleur du spinner
  const colorClasses = {
    blue: 'text-blue-500',
    white: 'text-white'
  };

  // Configuration pour l'animation des points avec framer-motion
  const dotVariants = {
    initial: { y: 0, opacity: 0.4 },
    animate: (i: number) => ({
      y: [0, -12, 0],
      opacity: [0.4, 1, 0.4],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
          delay: i * 0.1
        },
        opacity: {
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
          delay: i * 0.1
        }
      }
    })
  };

  // Intégration avec un conteneur plein écran si demandé
  if (fullScreen) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm z-50"
        >
          <div className="flex flex-col items-center">
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={dotVariants}
                  initial="initial"
                  animate="animate"
                  className={`rounded-full ${sizeClasses[size]} ${colorClasses[color]} opacity-80`}
                  style={{
                    background: "linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb)",
                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
                  }}
                />
              ))}
            </div>
            <div className="mt-4 text-gray-200 font-medium">
              Loading...
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Version standard (non plein écran)
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center items-center py-4"
      >
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={dotVariants}
              initial="initial"
              animate="animate"
              className={`rounded-full ${sizeClasses[size]} ${colorClasses[color]} opacity-80`}
              style={{
                background: "linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb)",
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingSpinner; 