import type { Config } from 'tailwindcss';

// TODO: это нужно только чтобы старая версия WebStorm подхватила настройки.
//  Современный Tailwind не нуждается в
//  этом файле.
export const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-primary': 'var(--color-cyber-primary)',
        'cyber-secondary': 'var(--color-cyber-secondary)',
        'cyber-disabled': 'var(--color-cyber-disabled)',
        'cyber-text': 'var(--color-cyber-text)',
        'cyber-text-secondary': 'var(--color-cyber-text-secondary)',
        'cyber-background': 'var(--color-cyber-background)',
      },
    },
  },
  plugins: [],
};
