/**
 * Общие пропсы для задания размеров и отступов
 * во всех UI-компонентах.
 *
 * Все значения соответствуют scale Tailwind (например: 1 = 0.25rem).
 */
export type SizeProps = {
  fullWidth?: boolean;

  fullHeight?: boolean;

  width?: number;

  height?: number;

  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;

  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
};
