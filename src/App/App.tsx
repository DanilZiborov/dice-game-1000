import type { JSX } from 'react';
import { StrictMode } from 'react';
import { DbProvider } from 'db/DbContext';
import { CurrentGameProvider } from 'context/currentGame/CurrentGameContext';
import { AppRoutes } from 'App/AppRoutes';

export const App = (): JSX.Element => {
  return (
    <StrictMode>
      <DbProvider>
        <CurrentGameProvider>
          <AppRoutes />
        </CurrentGameProvider>
      </DbProvider>
    </StrictMode>
  );
};
