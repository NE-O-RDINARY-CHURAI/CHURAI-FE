import { Outlet, useNavigate } from 'react-router-dom'
import BaseLayout from './BaseLayout'
import Logo from '../assets/icons/logo.svg?react'
import SearchIcon from '../assets/icons/search.svg?react'

export default function HomeLayout() {
  const navigate = useNavigate()

  return (
    <BaseLayout>
      <header className="bg-main relative mb-6 flex h-14 items-center justify-center text-white">
        <Logo className="h-9 cursor-pointer" onClick={() => navigate('/')} />
        <SearchIcon
          className="hover:text-gray2 absolute right-7 cursor-pointer"
          onClick={() => navigate('search')}
        />
      </header>
      <Outlet />
    </BaseLayout>
  )
}
