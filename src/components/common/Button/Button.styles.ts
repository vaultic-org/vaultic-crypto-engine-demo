import { ButtonVariant } from "./Button.types";
import { ButtonSize } from "./Button.types";


export const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    outline: "border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white",
    ghost: "text-gray-300 hover:text-white hover:bg-gray-800"
};

export const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
};