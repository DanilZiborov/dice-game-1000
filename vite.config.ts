import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`vite mode => ${mode}`);

  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: mode === 'development' ? '/' : '/dice-game-1000/',
    plugins: [
      react(),
      tsconfigPaths(),
      tailwindcss(),
      checker({
        // Typechecking in development mode
        typescript: {
          tsconfigPath: './tsconfig.app.json',
        },
        // Linting in production mode
        ...(mode === 'production' && {
          eslint: {
            lintCommand:
              'eslint "./src/**/*.{ts,tsx}"' +
              ' --report-unused-disable-directives' +
              ' --max-warnings 0',
          },
        }),
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'dist/index.html',
            dest: '',
            rename: '404.html',
          },
        ],
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Roll 1000',
          short_name: 'Roll 1000',
          description: 'Приложение для записи бросков костей в игре «Тысяча»',
          // цвет tailwind-slate-900
          theme_color: '#0f172a',
          background_color: '#0f172a',
          display: 'standalone',
          scope: '/',
          start_url: './',
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
      proxy: {
        '/api': {
          target: env.VITE_PROXY,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 3080,
      proxy: {
        // При запуске vite preview, mode = production и используется
        // .env.production
        '/api': {
          target: env.VITE_PROXY,
          changeOrigin: true,
        },
      },
    },
  };
});
