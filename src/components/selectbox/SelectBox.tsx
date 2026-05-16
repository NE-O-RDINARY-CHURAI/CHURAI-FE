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
      {label && <label className="caption1-medium text-gray4">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full h-10 px-4 py-2 bg-white border border-gray2 rounded-lg caption1-regular text-left transition-all duration-200 focus:outline-none focus:border-main"
        >
          <span className={value === '' ? 'text-gray2' : 'text-black font-semibold'}>
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
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray1 rounded-lg shadow-lg overflow-hidden">
            <li>
              <button
                type="button"
                onClick={() => {
                  onChange('MEAL');
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 caption1-regular text-left transition-colors hover:bg-sub hover:text-main ${
                  value === 'MEAL' ? 'bg-sub text-main font-semibold' : 'text-gray4'
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
                className={`w-full px-4 py-2.5 caption1-regular text-left transition-colors hover:bg-sub hover:text-main ${
                  value === 'DESSERT' ? 'bg-sub text-main font-semibold' : 'text-gray4'
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