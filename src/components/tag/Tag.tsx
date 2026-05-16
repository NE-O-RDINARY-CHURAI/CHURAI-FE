interface TagProps {
  children: string;
  variant?: 'default' | 'active';
  onDelete?: () => void;
  className?: string;
}

export default function Tag({ variant = 'default', children, onDelete, className = '' }: TagProps) {
  
  const baseStyle = 'inline-flex items-center gap-1.5 h-9 px-4 py-2 bg-[#FFFFFF] border text-sm font-medium rounded-full transition-all duration-200';

  const variants = {
    default: 'border-[#B6B6B6] text-[#555555]',
    active: 'border-[#FD4A12] text-[#FD4A12]',
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
          className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[#B6B6B6] hover:text-[#555555] active:text-black transition-colors"
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