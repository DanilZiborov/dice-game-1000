declare module 'virtual:pwa-register/react' {
  export function useRegisterSW(): {
    needRefresh: [boolean, () => void];
    offlineReady: [boolean, () => void];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}
