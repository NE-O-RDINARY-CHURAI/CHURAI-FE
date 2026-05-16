import { Outlet } from 'react-router-dom'
import BaseLayout from './BaseLayout'
import Logo from '../assets/icons/logo.svg?react'
import SearchIcon from '../assets/icons/search.svg?react'

export default function HomeLayout() {
  return (
    <BaseLayout>
      <header className="relative flex items-center justify-center py-2.5">
        <Logo className="w-20" />
        <SearchIcon className="text-gray3 absolute right-7" />
      </header>
      <Outlet />
    </BaseLayout>
  )
}
