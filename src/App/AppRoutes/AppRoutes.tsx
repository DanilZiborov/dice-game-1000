import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import type { JSX } from 'react';
import { AppLayout } from 'App/AppLayout';
import { CurrentGame, NewGame } from 'pages';
import { GameAppWrapper } from 'App/GameAppWrapper';
import { DbProvider } from 'db/DbContext';
import { CurrentGameProvider } from 'context/currentGame/CurrentGameContext';
import { Landing } from 'pages/Landing';
import { DataTransfer } from 'pages/DataTransfer';
import { Combos } from 'pages/Combos';
import Rules from 'pages/Rules/Rules';
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
        path: 'landing',
        element: <Landing />,
      },

      {
        path: 'about',
        element: <p>о проекте</p>,
      },

      {
        path: 'rules',
        element: <Rules/>,
      },

      {
        path: 'combos',
        element: <Combos />,
      },

      {
        path: 'app',
        element: (
          <DbProvider>
            <CurrentGameProvider>
              <GameAppWrapper />
            </CurrentGameProvider>
          </DbProvider>
        ),
        children: [
          {
            path: 'game',
            element: <GameNav />,
          },
          {
            path: 'game/current/:playerId?',
            element: <CurrentGame />,
          },
          {
            path: 'game/new',
            element: <NewGame />,
          },
          {
            path: 'data-transfer',
            element: <DataTransfer />,
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
