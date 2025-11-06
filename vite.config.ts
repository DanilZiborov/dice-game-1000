import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`vite mode => ${mode}`);

  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
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
