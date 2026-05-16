import React from 'react';

interface TagProps {
  children: string;
  variant?: 'default' | 'active';
  onDelete?: () => void;
  className?: string;
}

export default function Tag({ variant = 'default', children, onDelete, className = '' }: TagProps) {
  
  // 🌟 변경 포인트: text-sm font-medium -> caption1-medium 변경
  const baseStyle = 'inline-flex items-center gap-1.5 h-9 px-4 py-2 bg-white border caption1-medium rounded-full transition-all duration-200';

  // 🌟 변경 포인트: 하드코딩 헥사코드 제거 및 gray2, gray3, main 테마 적용
  const variants = {
    default: 'border-gray2 text-gray3',
    active: 'border-main text-main',
  };

  return (
    <div className={`${baseStyle} ${variants[variant]} ${className}`}>
      <span>#{children}</span>
      
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          // 🌟 변경 포인트: text-[#B6B6B6] -> text-gray2 / hover:text-gray4 변경
          className="inline-flex items-center justify-center w-4 h-4 rounded-full text-gray2 hover:text-gray4 active:text-black transition-colors"
          aria-label="태그 삭제"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}