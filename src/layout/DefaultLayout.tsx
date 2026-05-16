import { Outlet } from 'react-router-dom'
import BaseLayout from './BaseLayout'

export default function DefaultLayout() {
  return (
    <BaseLayout>
      <header> {/* 헤더 */}</header>
      <Outlet />
    </BaseLayout>
  )
}
