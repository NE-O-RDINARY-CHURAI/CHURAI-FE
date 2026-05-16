import { Outlet } from 'react-router-dom'
import BaseLayout from './BaseLayout'

export default function DefaultLayout() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  )
}
