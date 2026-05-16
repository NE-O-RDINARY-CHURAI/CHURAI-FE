import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 버튼의 너비를 동적으로 제어하기 위한 props.
   * - 'auto': 글자 크기에 맞춤 (기본값, 최소 98px 유지)
   * - 'full': 가로 전체를 꽉 채움 (w-full)
   */
  width?: 'auto' | 'full';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  width = 'auto', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  
  // 1. 피그마 기준 스펙
  const baseStyle = 'inline-flex items-center justify-center h-[37px] px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none';

  // 2. 너비 동적 변화
  const widthStyles = {
    auto: 'min-w-[98px] w-auto', 
    full: 'w-full',            
  };

  const variants = {
    primary: 'bg-[#FD4A12] text-white hover:bg-[#e03e0b] active:bg-[#c43307]',
    secondary: 'bg-[#FFEDE7] text-[#FD4A12] border border-[#FD4A12] hover:bg-[#ffdcd0] active:bg-[#ffcab8]',
    tertiary: 'bg-[#F4F5F6] text-[#555555] border border-[#E5E7EB] hover:bg-[#eaebeb] active:bg-[#dddfdf]',
  };

  return (
    <button
      className={`${baseStyle} ${widthStyles[width]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}