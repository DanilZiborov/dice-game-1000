import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import type { JSX } from 'react';
import { AppLayout } from 'App/AppLayout';
import { Temporal } from 'pages/Temporal/Temporal';
import { CurrentGame, NewGame, StartPage } from 'pages';
import { RequireCurrentGame } from 'App/AppRoutes/RequireCurrentGame';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <StartPage />,
      },

      {
        path: 'game',
        element: <RequireCurrentGame />,
        children: [
          {
            path: '/game/:recordMode?',
            element: <CurrentGame />,
          },
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
