import { createBrowserRouter } from 'react-router-dom'
import HomeLayout from '../layout/HomeLayout'
import DefaultLayout from '../layout/DefaultLayout'
import HomePage from '../pages/home/HomePage'
import BoardPage from '../pages/board/BoardPage'
import SearchPage from '../pages/search/SearchPage'
import BoardDetailPage from '../pages/boardDetail/BoardDetailPage'
import BoardCreatePage from '../pages/boardCreate/BoardCreatePage'
import BoardEditPage from '../pages/boardEdit/BoardEditPage'

export const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/board',
        element: <BoardPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        /* 🌟 2. 빈 값으로 비어있던 장소에 완성된 BoardDetail을 매핑합니다! */
        path: '/boardDetail/:id',
        element: <BoardDetailPage />,
      },
      {
        path: '/boardCreate',
        element: <BoardCreatePage />,
      },
      {
        path: '/boardEdit/:id',
        element: <BoardEditPage />,
      },
    ],
  },
]);