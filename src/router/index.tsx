import { createBrowserRouter, Outlet } from 'react-router-dom'
import App from '../App'

export const router = createBrowserRouter([
  {
    element: <Outlet />, // Layout 자리
    children: [
      {
        path: '/',
        element: <App />, // Home 자리
      },
      {
        path: '/board',
        element: <></>, // Board 자리
      },
      {
        path: '/search',
        element: <></>, // Search 자리
      },
      {
        path: '/boardDetail/:id',
        element: <></>, // BoardDetail 자리
      },
      {
        path: '/boardCreate',
        element: <></>, // BoardCreate 자리
      },
      {
        path: '/boardEdit/:id',
        element: <></>, // BoardEdit 자리
      },
    ],
  },
])
