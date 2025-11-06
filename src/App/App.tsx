import type { JSX } from 'react';
import { StrictMode } from 'react';
import { DbProvider } from 'db/DbContext';
import { CurrentGameProvider } from 'context/currentGame/CurrentGameContext';
import { AppRoutes } from 'App/AppRoutes';
import { GlobalErrorBoundary } from 'App/GlobalErrorBoundary';

export const App = (): JSX.Element => {
  return (
    <StrictMode>
      <GlobalErrorBoundary>
        <DbProvider>
          <CurrentGameProvider>
            <AppRoutes />
          </CurrentGameProvider>
        </DbProvider>
      </GlobalErrorBoundary>
    </StrictMode>
  );
};
