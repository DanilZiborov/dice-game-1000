import { useMemo } from 'react';
import type { SizeProps } from '../types/size';

/**
 * Хук для генерации tailwind-классов размеров и отступов
 * на основе пропсов.
 */
export const useSizeClasses = (props: SizeProps): string => {
  return useMemo(() => {
    const classes: string[] = [];

    // простые флаги
    if (props.fullWidth) classes.push('w-full');
    if (props.fullHeight) classes.push('h-full');

    // фиксированные размеры
    if (props.width !== undefined) classes.push(`w-${props.width}`);
    if (props.height !== undefined) classes.push(`h-${props.height}`);

    // словарь: проп → префикс tailwind
    const mapping: Record<keyof SizeProps, string> = {
      px: 'px',
      py: 'py',
      pt: 'pt',
      pb: 'pb',
      pl: 'pl',
      pr: 'pr',
      mx: 'mx',
      my: 'my',
      mt: 'mt',
      mb: 'mb',
      ml: 'ml',
      mr: 'mr',
      fullWidth: '', // исключаем (обрабатывается выше)
      fullHeight: '', // исключаем
      width: '',
      height: '',
    };

    // динамический проход по padding/margin
    (Object.keys(mapping) as (keyof SizeProps)[]).forEach((key) => {
      const prefix = mapping[key];
      const value = props[key];

      if (prefix && value !== undefined) {
        classes.push(`${prefix}-${value}`);
      }
    });

    console.log(classes.join(' '));

    return classes.join(' ');
  }, [props]);
};
