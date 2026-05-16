import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import HomeLayout from '../layout/HomeLayout'
import DefaultLayout from '../layout/DefaultLayout'

export const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <App />, // Home 자리
      },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
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
