import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CreateButton from '../assets/icons/create-button.svg?react'

interface Props {
  children: ReactNode
}

const HIDE_FAB_PREFIXES = ['/boardCreate', '/boardDetail']

export default function BaseLayout({ children }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const showFab = !HIDE_FAB_PREFIXES.some(prefix => pathname.startsWith(prefix))

  return (
    <div
      className="bg-gray1 relative mx-auto flex min-h-dvh w-full max-w-107.5 flex-col overflow-x-hidden"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {children}
      {showFab && (
        <button
          onClick={() => navigate('/boardCreate')}
          className="bg-main fixed right-6 bottom-6 z-50 rounded-full p-3 shadow-lg"
          aria-label="레시피 작성"
        >
          <CreateButton className="h-7 w-7" />
        </button>
      )}
    </div>
  )
}
