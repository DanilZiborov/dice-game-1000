import { createBrowserRouter, RouterProvider, type RouteObject, Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { AppLayout } from 'App/AppLayout';
import { Temporal } from 'pages/Temporal/Temporal';
import { CurrentGame, NewGame } from 'pages';
import { Record } from 'pages/CurrentGame/Record/Record';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/game" replace />,
      },

      {
        path: 'game',
        element: <CurrentGame />,
        children: [
          {
            element: <Record disableRecordMode={}/>
          }
        ],
      },

      {
        path: 'new-game',
        element: <NewGame />,
      },
      {
        path: 'temp',
        element: <Temporal />,
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
