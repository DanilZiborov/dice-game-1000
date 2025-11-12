import type { JSX, ReactElement } from 'react';
import { cloneElement } from 'react';

type RepeatComponentProps = {
  count: number;
  children: ReactElement;
};

// реплицирует комопнент определённое количество раз. Используется для рендеринга одинаковых иконок в статусах.
export const RepeatComponent = ({ count, children }: RepeatComponentProps): JSX.Element => (
  // eslint-disable-next-line react/no-array-index-key
  <>{Array.from({ length: count }).map((_, i) => cloneElement(children, { key: i }))}</>
);
