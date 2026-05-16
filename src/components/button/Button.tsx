import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyle = 'inline-flex items-center justify-center min-w-[98px] h-[37px] px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none';

  const variants = {
    primary: 'bg-[#FD4A12] text-white hover:bg-[#e03e0b] active:bg-[#c43307]',
    secondary: 'bg-[#FFEDE7] text-[#FD4A12] border border-[#FD4A12] hover:bg-[#ffdcd0] active:bg-[#ffcab8]',
    tertiary: 'bg-[#F4F5F6] text-[#555555] border border-[#E5E7EB] hover:bg-[#eaebeb] active:bg-[#dddfdf]',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}