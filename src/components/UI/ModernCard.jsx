
import React from 'react';

const ModernCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  gradient = false,
  ...props 
}) => {
  const baseClasses = 'rounded-xl shadow-card border transition-all duration-300 overflow-hidden';
  
  const variants = {
    default: 'bg-white border-gray-100',
    glass: 'bg-white/20 backdrop-blur-md border-white/30',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border-gray-200',
    stats: 'bg-white border-gray-100 relative',
  };

  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';
  const gradientBorder = gradient ? 'before:content-[""] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600' : '';

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${gradientBorder} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default ModernCard;
