import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  pill?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  pill = true, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-bold inline-flex items-center justify-center transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-reddit-blue text-white hover:bg-reddit-hover border border-transparent",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-transparent",
    outline: "bg-transparent text-reddit-blue border border-reddit-blue hover:bg-blue-50",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-200 border border-transparent text-gray-700",
  };

  const sizes = {
    sm: "text-xs px-3 py-1",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
    icon: "p-2",
  };

  const rounded = pill ? "rounded-full" : "rounded-md";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${rounded} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};