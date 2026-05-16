import { useState, useRef, useEffect } from 'react';
import ArrowDownIcon from '../../assets/icons/arrow-down.svg';

interface SelectBoxProps {
  label?: string;
  value: 'MEAL' | 'DESSERT' | '';
  onChange: (value: 'MEAL' | 'DESSERT') => void;
}

export default function SelectBox({ label, value, onChange }: SelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const valueLabels = {
    MEAL: '식사류',
    DESSERT: '디저트류',
    '': '선택해주세요.',
  };

  return (
    <div ref={containerRef} className="flex flex-col w-full gap-2">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full h-[40px] px-4 py-2 bg-[#FFF] border border-[#B6B6B6] rounded-lg text-sm text-left transition-all duration-200 focus:outline-none focus:border-[#FD4A12]"
        >
          <span className={value === '' ? 'text-[#B6B6B6]' : 'text-slate-900 font-medium'}>
            {valueLabels[value]}
          </span>

          <img 
            src={ArrowDownIcon} 
            alt="화살표 아이콘" 
            className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true" 
          />
        </button>

        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg overflow-hidden">
            <li>
              <button
                type="button"
                onClick={() => {
                  onChange('MEAL');
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-[#FFEDE7] hover:text-[#FD4A12] ${
                  value === 'MEAL' ? 'bg-[#FFEDE7] text-[#FD4A12] font-semibold' : 'text-slate-700'
                }`}
              >
                식사류
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  onChange('DESSERT');
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-[#FFEDE7] hover:text-[#FD4A12] ${
                  value === 'DESSERT' ? 'bg-[#FFEDE7] text-[#FD4A12] font-semibold' : 'text-slate-700'
                }`}
              >
                디저트류
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}