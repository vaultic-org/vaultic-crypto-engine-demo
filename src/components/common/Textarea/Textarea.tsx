import { forwardRef } from "react";
import { TextareaProps } from "./Textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      name,
      placeholder,
      value,
      onChange,
      onBlur,
      disabled = false,
      error,
      label,
      helperText,
      className = "",
      rows = 4,
      ...rest
    },
    ref
  ) => {
    const baseStyles =
      "w-full px-4 py-2 bg-gray-800 border rounded-md focus:outline-none focus:ring-2 transition-colors";
    const disabledStyles = "opacity-60 cursor-not-allowed";
    const errorStyles =
      "border-red-500 focus:border-red-500 focus:ring-red-500";
    const normalStyles =
      "border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-white placeholder-gray-500";

    const textareaClasses = `
    ${baseStyles}
    ${disabled ? disabledStyles : ""}
    ${error ? errorStyles : normalStyles}
    ${className}
  `;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          name={name}
          className={textareaClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          rows={rows}
          {...rest}
        />

        {(error || helperText) && (
          <p
            className={`mt-1 text-sm ${
              error ? "text-red-500" : "text-gray-400"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
