// shared/utils/isPWA.ts
export const isPWA = (): boolean => {
  // iOS Safari
  if ('standalone' in navigator && navigator.standalone) return true;

  // Остальные браузеры
  return window.matchMedia('(display-mode: standalone)').matches;
};
