import type { JSX, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { SecondaryButton } from 'components';

type GlobalErrorBoundaryProps = { children: ReactNode };

export const GlobalErrorBoundary = ({ children }: GlobalErrorBoundaryProps): JSX.Element => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent): void => {
      setError(event.error?.message || String(event.message));
    };

    const handleRejection = (event: PromiseRejectionEvent): void => {
      setError(event.reason?.message || String(event.reason));
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  if (error) {
    return (
      <div className="bg-cyber-background flex h-screen w-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 text-2xl text-red-500">{error}</h1>
        <SecondaryButton onClick={() => window.location.reload()}>Перезагрузить</SecondaryButton>
      </div>
    );
  }

  return <>{children}</>;
};
