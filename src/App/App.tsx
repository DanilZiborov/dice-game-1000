import type { JSX } from 'react';
import { StrictMode } from 'react';
import { AppRoutes } from 'App/AppRoutes';
import { DbProvider } from 'db/DbContext';

export const App = (): JSX.Element => {
  return (
    <StrictMode>
      <DbProvider>
        <AppRoutes />
      </DbProvider>
    </StrictMode>
  );
};
