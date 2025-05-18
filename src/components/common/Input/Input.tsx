import { forwardRef } from 'react';
import { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  error,
  label,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  ...rest
}, ref) => {
  const baseStyles = 'w-full px-4 py-2 bg-gray-800 border rounded-md focus:outline-none focus:ring-2 transition-colors';
  const disabledStyles = 'opacity-60 cursor-not-allowed';
  const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
  const normalStyles = 'border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-white placeholder-gray-500';
  
  const inputClasses = `
    ${baseStyles}
    ${disabled ? disabledStyles : ''}
    ${error ? errorStyles : normalStyles}
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${className}
  `;
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{leftIcon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          {...rest}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';