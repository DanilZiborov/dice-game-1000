export default {
  singleQuote: true,
  printWidth: 120,

  // ⬇️ Отключаем автоматический поиск плагинов Prettier в node_modules.
  // По умолчанию Prettier сканирует все пакеты "prettier-plugin-*",
  // что может вызывать конфликт с Tailwind Language Server в WebStorm.
  // Мы явно указываем нужные плагины, чтобы избежать гонки и ускорить запуск.
  pluginSearchDirs: false,

  plugins: ['prettier-plugin-tailwindcss'],
}