import { type JSX } from 'react';
import { Navigate } from 'react-router-dom';

export const StartPage = (): JSX.Element => {
  return <Navigate to="/app/game" />;
};
