import React, { useState, useRef, FC, ReactElement, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 0.4,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const childRef = useRef<HTMLElement>(null);

  // Arrow position styles
  const arrowStyles = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
  };

  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  // Calculate the position of the tooltip when it becomes visible
  useEffect(() => {
    if (isVisible && childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      const newPosition = calculatePosition(rect, position);
      setTooltipPosition(newPosition);
    }
  }, [isVisible, position]);

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  return (
    <div 
      className="relative inline-block" 
      onMouseEnter={showTooltip} 
      onMouseLeave={hideTooltip} 
      onFocus={showTooltip} 
      onBlur={hideTooltip}
      ref={childRef as React.RefObject<HTMLDivElement>}
    >
      {children}
      
      {/* Portal tooltip to ensure it's not affected by parent overflow */}
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className={`absolute z-50 whitespace-nowrap px-3 py-1.5 bg-gray-800 text-gray-200 text-xs font-medium rounded shadow-lg border border-gray-700 pointer-events-none`}
              style={{
                top: tooltipPosition.top,
                left: tooltipPosition.left
              }}
            >
              {content}
              <div className={`absolute border-4 border-gray-800 ${arrowStyles[position]}`}></div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

// Function to calculate the position of the tooltip
const calculatePosition = (rect: DOMRect, position: string) => {
  // Calculate the positions based on the chosen option
  switch (position) {
    case 'top':
      return {
        left: rect.left + rect.width / 2,
        top: rect.top - 8,
        transform: 'translate(-50%, -100%)'
      };
    case 'bottom':
      return {
        left: rect.left + rect.width / 2,
        top: rect.bottom + 8,
        transform: 'translate(-50%, 0)'
      };
    case 'left':
      return {
        left: rect.left - 8,
        top: rect.top + rect.height / 2,
        transform: 'translate(-100%, -50%)'
      };
    case 'right':
      return {
        left: rect.right + 8,
        top: rect.top + rect.height / 2,
        transform: 'translate(0, -50%)'
      };
    default:
      return {
        left: rect.left + rect.width / 2,
        top: rect.top - 8,
        transform: 'translate(-50%, -100%)'
      };
  }
};

export default Tooltip; 