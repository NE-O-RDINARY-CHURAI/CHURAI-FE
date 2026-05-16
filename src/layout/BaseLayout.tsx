import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function BaseLayout({ children }: Props) {
  return (
    <div
      className="bg-gray1 relative mx-auto flex min-h-dvh w-full min-w-97.5 flex-col overflow-x-hidden"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {children}
    </div>
  )
}
