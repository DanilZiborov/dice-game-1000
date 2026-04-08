import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router-dom';
import type { JSX } from 'react';
import { AppLayout } from 'App/AppLayout';
import { CurrentGame, NewGame } from 'pages';
import { GameAppWrapper } from 'App/GameAppWrapper';
import { DbProvider } from 'db/DbContext';
import { CurrentGameProvider } from 'context/currentGame/CurrentGameContext';
import { Landing } from 'pages/Landing';
import { DataTransfer } from 'pages/DataTransfer';
import { Combos } from 'pages/Combos';
import { Rules } from 'pages/Rules';
import { FinishedGames } from 'pages/FinishedGames/FinishedGames';
import { Settings } from 'pages/Settings';
import { PageNotFound } from 'App/AppRoutes/PageNotFound';
import { GameNav } from './GameNav';
import { StartPage } from './StartPage';
import { Info } from 'pages/Info';

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
        path: 'rules',
        element: <Rules />,
      },

      {
        path: 'combos',
        element: <Combos />,
      },

      {
        path: 'info',
        element: <Info />,
      },

      {
        path: 'finished/:gameId?',
        element: (
          <DbProvider>
            <FinishedGames />
          </DbProvider>
        ),
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
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },

      {
        path: '*',
        element: <PageNotFound />,
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
