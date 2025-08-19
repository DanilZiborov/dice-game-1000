import type { JSX } from 'react';
import { AppRoutes } from 'App/AppRoutes';
import { StrictMode } from 'react';

export const App = (): JSX.Element => {
  return (
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  );
};
