import { useState, useRef, useEffect } from 'react'
import ArrowDownIcon from '../../assets/iconsnpm install -D vite-plugin-svgr/arrow-down.svg?react'

interface DropdownProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export default function Dropdown({ options, value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="caption1-medium text-gray3 flex items-center gap-1 px-2 py-1"
      >
        {value}
        <ArrowDownIcon
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="border-gray1 absolute right-0 z-10 min-w-30 overflow-hidden rounded-lg border bg-white">
          {options.map(option => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                className={`caption1-medium border-gray1 w-full border-b px-4 py-2 text-left ${
                  value === option ? 'text-main' : 'text-gray4'
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
