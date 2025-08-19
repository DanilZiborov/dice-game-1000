import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import type { JSX } from 'react';
import { Main } from 'pages/Main';
import { AppLayout } from 'App/AppLayout';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '*',
        element: <div>404 – Страница не найдена</div>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export const AppRoutes = (): JSX.Element => {
  return <RouterProvider router={router} />;
};
