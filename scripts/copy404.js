import { copyFileSync } from 'fs';

// Этот скрипт нужен для GitHub Pages для поддержки spa-роутинга

copyFileSync(
  'dist/index.html',
  'dist/404.html'
);

// Лог в консоль, чтобы видеть в терминале, что шаг выполнен
console.log('Страница 404.html успешно создана из копии index.html');
