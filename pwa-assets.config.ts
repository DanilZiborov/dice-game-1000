// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from '@vite-pwa/assets-generator/config';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  preset: 'minimal',
  images: ['public/icon-main.svg'],
});
