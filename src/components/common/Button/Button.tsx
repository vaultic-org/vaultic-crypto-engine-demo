import { forwardRef } from "react";
import { Link } from "@tanstack/react-router";
import { variantStyles, sizeStyles } from "./Button.styles";
import {
  ButtonProps,
  LinkButtonProps,
  AnchorButtonProps,
  ButtonButtonProps,
} from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      as,
      className = "",
      children,
      isLoading,
      loadingText,
      leftIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
    const loadingStyles = isLoading ? "opacity-80 cursor-wait relative" : "";
    const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${loadingStyles} ${className}`;

    const content = (
      <>
        {isLoading ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <span className="opacity-0">{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
          </>
        )}
      </>
    );

    if (as === Link) {
      const { to, ...linkProps } = props as LinkButtonProps;
      return (
        <Link to={to} className={styles} {...linkProps}>
          {content}
        </Link>
      );
    }

    if (as === "a") {
      const { href, ...anchorProps } = props as AnchorButtonProps;
      return (
        <a href={href} className={styles} {...anchorProps}>
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} className={styles} disabled={isLoading || disabled} {...(props as ButtonButtonProps)}>
        {content}
      </button>
    );
  }
);
