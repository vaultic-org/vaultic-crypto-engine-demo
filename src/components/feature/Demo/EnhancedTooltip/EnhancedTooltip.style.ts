export const getTooltipStyles = (
    position: "top" | "right" | "bottom" | "left",
    coords: { top: number, left: number }
) => {
    const baseStyles = {
      position: "absolute",
      zIndex: 9999,
      padding: "8px 12px",
      background: "rgba(17, 24, 39, 0.95)",
      color: "white",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: 500,
      maxWidth: "250px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      backdropFilter: "blur(4px)",
      border: "1px solid rgba(75, 85, 99, 0.3)",
      whiteSpace: "normal",
      textAlign: "left",
    };

    const arrowStyles = {
      position: "absolute",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderColor: "transparent",
      borderWidth: "5px",
    };

    const positionSpecificStyles = {
      top: {
        transform: "translateX(-50%)",
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        arrow: {
          ...arrowStyles,
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          borderTopColor: "rgba(17, 24, 39, 0.95)",
          borderWidth: "5px 5px 0 5px",
        },
      },
      right: {
        transform: "translateY(-50%)",
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        arrow: {
          ...arrowStyles,
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          borderRightColor: "rgba(17, 24, 39, 0.95)",
          borderWidth: "5px 5px 5px 0",
        },
      },
      bottom: {
        transform: "translateX(-50%)",
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        arrow: {
          ...arrowStyles,
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          borderBottomColor: "rgba(17, 24, 39, 0.95)",
          borderWidth: "0 5px 5px 5px",
        },
      },
      left: {
        transform: "translateY(-50%)",
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        arrow: {
          ...arrowStyles,
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          borderLeftColor: "rgba(17, 24, 39, 0.95)",
          borderWidth: "5px 0 5px 5px",
        },
      },
    };

    return {
      container: {
        ...baseStyles,
        ...positionSpecificStyles[position],
      },
      arrow: positionSpecificStyles[position].arrow,
    };
  };
