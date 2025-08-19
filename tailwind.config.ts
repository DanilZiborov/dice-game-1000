import type { Config } from 'tailwindcss';

// TODO: это нужно только чтобы старая версия webstorm подхватила настройки. Современный Tailwind не нуждается в этом файле.
export const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        testRed: '#ff0000',
      },
      fontFamily: {
        cyber: ['"Russo One"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
