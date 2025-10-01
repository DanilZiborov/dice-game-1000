import { useState, useCallback } from 'react';

type AsyncState<T> = {
  result: T | null;
  error: unknown;
  isPending: boolean;
};

type UseAsyncReturn<T> = AsyncState<T> & {
  execute: (...args: unknown[]) => void;
};

/**
 * Универсальный хук для асинхронных операций
 */
export const useAsync = <T>(asyncFn: (...args: unknown[]) => Promise<T>): UseAsyncReturn<T> => {
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isPending, setIsPending] = useState(false);

  const execute = useCallback(
    (...args: unknown[]) => {
      setIsPending(true);
      setError(null);
      setResult(null);

      asyncFn(...args)
        .then((data) => {
          setResult(data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsPending(false);
        });
    },
    [asyncFn],
  );

  return { execute, result, error, isPending };
};
