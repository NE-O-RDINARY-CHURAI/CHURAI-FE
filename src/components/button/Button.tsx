import React from 'react';
import HamburgerWhite from '../../assets/icons/hmabuger-white.svg';
import HamburgerOrange from '../../assets/icons/hmabuger-orange.svg';
import HamburgerGray from '../../assets/icons/hmabuger-gray.svg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  width?: 'auto' | 'full';
  showIcon?: boolean;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  width = 'auto', 
  showIcon = true, 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {

  const baseStyle = 'inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none gap-2 border';

  const widthStyles = {
    auto: 'min-w-24 w-auto',
    full: 'w-full',
  };

  const variantStyles = {
    primary: 'bg-[#FFEDE7] text-[#FD4A12] border-[#FD4A12] hover:bg-[#FD4A12] hover:text-white',
    secondary: 'bg-[#F4F5F6] text-[#8A949E] border-transparent hover:bg-[#8A949E] hover:text-white hover:border-[#8A949E]',
    tertiary: 'bg-white text-[#8A949E] border-[#CDD1D5] hover:text-[#FD4A12] hover:border-[#FD4A12]',
  };

  return (
    <button
      className={`${baseStyle} ${widthStyles[width]} ${variantStyles[variant]} group ${className}`}
      {...props}
    >
      {showIcon && (
        <div className="relative w-4 h-4 flex-shrink-0">
          
          {variant === 'primary' && (
            <>
              <img src={HamburgerOrange} alt="" className="absolute inset-0 w-4 h-4 object-contain opacity-100 group-hover:opacity-0 transition-opacity duration-200" />
              <img src={HamburgerWhite} alt="" className="absolute inset-0 w-4 h-4 object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </>
          )}

          {variant === 'secondary' && (
            <>
              <img src={HamburgerGray} alt="" className="absolute inset-0 w-4 h-4 object-contain opacity-100 group-hover:opacity-0 transition-opacity duration-200" />
              <img src={HamburgerWhite} alt="" className="absolute inset-0 w-4 h-4 object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </>
          )}

          {variant === 'tertiary' && (
            <>
              <img src={HamburgerGray} alt="" className="absolute inset-0 w-4 h-4 object-contain opacity-100 group-hover:opacity-0 transition-opacity duration-200" />
              <img src={HamburgerOrange} alt="" className="absolute inset-0 w-4 h-4 object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </>
          )}
        </div>
      )}
      <span>{children}</span>
    </button>
  );
}