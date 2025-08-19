import type { JSX } from 'react';
import { AppRoutes } from 'AppRoutes/AppRoutes';
import { StrictMode } from 'react';

export const App = (): JSX.Element => {
  return (
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  );
};
