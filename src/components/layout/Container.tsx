import type { JSX, ReactNode } from 'react';
import type { SizeProps } from '../types/size';
import { useSizeClasses } from '../hooks';

export type ContainerProps = SizeProps & {
  children: ReactNode;
  borderWidth?: number;
};

export const Container = ({
  children,
  borderWidth,
  ...sizeProps
}: ContainerProps): JSX.Element => {
  const sizeClasses = useSizeClasses(sizeProps);
  const borderClass = borderWidth
    ? `border-cyber-yellow border-${borderWidth}`
    : '';

  const classes = 

  return (
      // <div className={`block ${sizeClasses} ${borderClass}`.trim()}>{children}</div>
  <div className={sizeClasses}></div>
  );
};
