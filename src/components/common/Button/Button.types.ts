import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  disabled?: boolean;
}

export interface ButtonButtonProps extends BaseButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
}

export  interface LinkButtonProps extends BaseButtonProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  as: typeof Link;
  to: string;
}

export interface AnchorButtonProps extends BaseButtonProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  as: "a";
  href: string;
}

export type ButtonProps = ButtonButtonProps | LinkButtonProps | AnchorButtonProps;