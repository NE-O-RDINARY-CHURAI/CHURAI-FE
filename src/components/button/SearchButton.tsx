import { useNavigate } from 'react-router-dom'

interface SearchButtonProps {
  className?: string
}

export default function SearchButton({ className = '' }: SearchButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate('/search')}
      className={`inline-flex items-center justify-center text-black ${className}`}
      aria-label="검색"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path fill="currentColor" d="M16 10a6 6 0 1 0-12 .002A6 6 0 0 0 16 10Zm2 0a8 8 0 0 1-1.683 4.903l5.39 5.39a1 1 0 1 1-1.414 1.414l-5.39-5.39c-.563.437-1.18.8-1.841 1.074A8 8 0 1 1 18 10Z"/>
      </svg>
    </button>
  )
}
