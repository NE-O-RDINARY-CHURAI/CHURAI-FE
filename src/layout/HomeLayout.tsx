import { Outlet } from 'react-router-dom'
import BaseLayout from './BaseLayout'

export default function HomeLayout() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  )
}
