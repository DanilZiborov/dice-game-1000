import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import type { JSX } from 'react';
import { AppLayout } from 'App/AppLayout';
import { CurrentGame, NewGame } from 'pages';
import { GameAppWrapper } from 'App/GameAppWrapper';
import { GameNav } from './GameNav';
import { StartPage } from './StartPage';
import { DbProvider } from '../../db/DbContext';
import { CurrentGameProvider } from '../../context/currentGame/CurrentGameContext';
import { Landing } from '../../pages/Landing/Landing';

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
        path: 'landing',
        element: <Landing />,
      },

      {
        path: 'about',
        element: <p>о проекте</p>,
      },

      {
        path: 'howto',
        element: <p>правила игры</p>,
      },

      {
        path: 'combos',
        element: <p>комбинации кубиков</p>,
      },

      {
        path: 'app/game',
        element: (
          <DbProvider>
            <CurrentGameProvider>
              <GameAppWrapper />
            </CurrentGameProvider>
          </DbProvider>
        ),
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
