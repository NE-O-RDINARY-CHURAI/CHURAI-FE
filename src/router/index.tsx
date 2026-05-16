// router.tsx 최종 업데이트 형태 예시

import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import HomeLayout from '../layout/HomeLayout';
import DefaultLayout from '../layout/DefaultLayout';

// 페이지 import
import BoardCreate from '../pages/board/BoardCreate';
import BoardDetail from '../pages/board/BoardDetail'; // 🌟 1. 여기 import 추가!

export const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/board',
        element: <div>Board Page</div>,
      },
      {
        path: '/search',
        element: <div>Search Page</div>,
      },
      {
        /* 🌟 2. 빈 값으로 비어있던 장소에 완성된 BoardDetail을 매핑합니다! */
        path: '/boardDetail/:id',
        element: <BoardDetail />,
      },
      {
        path: '/boardCreate',
        element: <BoardCreate />,
      },
      {
        path: '/boardEdit/:id',
        element: <div>Board Edit Page</div>,
      },
    ],
  },
]);