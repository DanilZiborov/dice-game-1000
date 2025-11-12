
import { useEffect, useState, useCallback } from 'react';

export const useCheckPWAInstalled = (): {
  isPWAInstalled: boolean;
  triggerInstallPrompt: () => void;
} => {
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Проверка на iOS
    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isInStandaloneMode = 'standalone' in window.navigator && window.navigator.standalone;

    if (isIos && isInStandaloneMode) {
      setIsPWAInstalled(true);
    }

    // Android / Chrome
    const beforeInstallHandler = (e: Event): void => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsPWAInstalled(false); // PWA пока не установлено
    };

    const appInstalledHandler = (): void => {
      setIsPWAInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallHandler);
    window.addEventListener('appinstalled', appInstalledHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
      window.removeEventListener('appinstalled', appInstalledHandler);
    };
  }, []);

  const triggerInstallPrompt = useCallback(() => {
    console.log(deferredPrompt);

    if (deferredPrompt) {
      deferredPrompt.prompt();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          setIsPWAInstalled(true);
        }

        setDeferredPrompt(null);
      });
    }
    // На iOS системного prompt нет
  }, [deferredPrompt]);

  return { isPWAInstalled, triggerInstallPrompt };
};
