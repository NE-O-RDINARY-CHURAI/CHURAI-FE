import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  isActive?: boolean; 
  width?: 'full' | 'auto';
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  isActive = false, 
  width = 'auto',
  ...props          
}: ButtonProps) {

  const baseStyle = "h-12 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const widthStyle = width === 'full' ? 'w-full' : 'w-auto';
  const variantStyles = {
    primary: isActive 
      ? "bg-main text-white hover:bg-opacity-90 active:scale-[0.98]" 
      : "bg-gray2 text-gray3 cursor-not-allowed opacity-60", 
    secondary: "bg-white border border-gray2 text-gray4 hover:bg-gray1",
    tertiary: "bg-transparent text-gray3 hover:text-gray4"
  };

  return (
    <button
      disabled={variant === 'primary' ? !isActive : props.disabled}
      className={`${baseStyle} ${widthStyle} ${variantStyles[variant]} ${className}`}
      {...props} 
    >
      {children}
    </button>
  );
}