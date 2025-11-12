import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import type { JSX } from 'react';
import { AppLayout } from 'App/AppLayout';
import { CurrentGame, NewGame } from 'pages';
import { EnsureContext } from 'App/AppRoutes/EnsureContext';
import { GameNav } from './GameNav';
import { StartPage } from './StartPage';

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
        path: 'app/game',
        element: <EnsureContext />,
        children: [
          {
            index: true,
            element: <GameNav />,
          },
          {
            path: 'current/:playerId?',
            element: <CurrentGame />,
          },
          {
            path: 'new',
            element: <NewGame />,
          },
        ],
      },

      {
        path: '*',
        element: <div>404 – Страница не найдена</div>,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.DEV ? '/' : '/dice-game-1000/',
});

export const AppRoutes = (): JSX.Element => {
  return <RouterProvider router={router} />;
};
