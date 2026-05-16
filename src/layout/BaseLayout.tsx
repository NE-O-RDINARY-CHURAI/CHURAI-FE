import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function BaseLayout({ children }: Props) {
  return (
    <div
      className="relative mx-auto flex min-h-dvh w-full max-w-97.5 flex-col overflow-x-hidden bg-white"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {children}
    </div>
  )
}
