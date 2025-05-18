import React from 'react';
import { CardProps } from './Card.types';

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden ${className}`}
      {...rest}
    >
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};