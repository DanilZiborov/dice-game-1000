import { type JSX, useEffect } from 'react';
import { StrictMode } from 'react';
import { DbProvider } from 'db/DbContext';
import { CurrentGameProvider } from 'context/currentGame/CurrentGameContext';
import { AppRoutes } from 'App/AppRoutes';
import { GlobalErrorBoundary } from 'App/GlobalErrorBoundary';

export const App = (): JSX.Element => {
  // консоль для мобильных браузеров
  useEffect(() => {
    if (import.meta.env.DEV) {
      // нужно только для разработки
      // eslint-disable-next-line import/no-extraneous-dependencies
      import('eruda').then(({ default: eruda }) => {
        eruda.init();
      });
    }
  }, []);

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
