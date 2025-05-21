import { ReactNode, useState, useEffect, useRef, CSSProperties } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { getTooltipStyles } from "./EnhancedTooltip.style";

export const EnhancedTooltip = ({
  show,
  text,
  position = "right",
  children,
}: {
  show: boolean;
  text: string;
  position?: "top" | "right" | "bottom" | "left";
  children: ReactNode;
}) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const childRef = useRef<HTMLDivElement>(null);

  // Calculate position
  useEffect(() => {
    if (childRef.current && show) {
      const rect = childRef.current.getBoundingClientRect();
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const positions = {
        top: {
          top: rect.top + scrollTop - 8,
          left: rect.left + scrollLeft + rect.width / 2,
        },
        right: {
          top: rect.top + scrollTop + rect.height / 2,
          left: rect.left + scrollLeft + rect.width + 8,
        },
        bottom: {
          top: rect.top + scrollTop + rect.height + 8,
          left: rect.left + scrollLeft + rect.width / 2,
        },
        left: {
          top: rect.top + scrollTop + rect.height / 2,
          left: rect.left + scrollLeft - 8,
        },
      };

      setCoords(positions[position]);
    }
  }, [show, position]);

  const renderTooltipPortal = () => {
    if (!show || typeof document === "undefined") return null;

    const styles = getTooltipStyles(position, coords);

    return createPortal(
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15 }}
        style={styles.container as CSSProperties}
      >
        {text}
        <div style={styles.arrow as CSSProperties} />
      </motion.div>,
      document.body
    );
  };

  return (
    <div ref={childRef} className="inline-flex items-center justify-center">
      {children}
      {renderTooltipPortal()}
    </div>
  );
};
