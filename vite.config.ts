import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const base = mode === 'development' ? '/' : '/dice-game-1000/';

  return {
    base,

    plugins: [
      react(),
      tsconfigPaths(),
      tailwindcss(),
      checker({
        typescript: {
          tsconfigPath: './tsconfig.app.json',
        },
        ...(mode === 'production' && {
          eslint: {
            lintCommand: 'eslint "./src/**/*.{ts,tsx}"' + ' --report-unused-disable-directives' + ' --max-warnings 0',
          },
        }),
      }),

      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],

        workbox: {
          runtimeCaching: [
            {
              urlPattern: /\.woff2$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'fonts',
              },
            },
          ],
        },

        manifest: {
          name: 'Roll 1000',
          short_name: 'Roll 1000',
          description: 'Приложение для записи бросков костей в игре «Тысяча»',
          // цвет tailwind-slate-900
          theme_color: '#0f172a',
          background_color: '#0f172a',
          display: 'standalone',

          scope: base,
          start_url: base,

          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],

    server: {
      port: 3777,
    },

    preview: {
      port: 3080,
    },
  };
});
