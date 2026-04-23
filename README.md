
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/) 
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6)](https://www.typescriptlang.org/) 
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?logo=tailwindcss&logoColor=white) 
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff)](https://vitejs.dev/) 
[![GitHub Pages](https://img.shields.io/badge/deployed-GH%20Pages-blue)](https://danilziborov.github.io/dice-game-1000/) 
[![PWA](https://img.shields.io/badge/PWA-enabled-brightgreen)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 


**Трекер для игры в «Тысячу» на костях.**


Позволяет автоматизировать запись результатов бросков, которая обычно ведётся на бумаге. Поддерживает все игровые правила (болты, ямы, обгон и т.д.), а также имеет гибкие настройки для каждой партии под ваш стиль игры. Из дополнительных функций есть журнал с историей партий и краткой стаистикой, импорт и экспорт журнала через файл, а также справочник по правилам игры и комбинациям. 
Приложение работает без интернета, не собирает никаких данных и хранит всю информацию на устройстве пользователя.

🔗 **Ссылка на последнюю версию:** [https://danilziborov.github.io/dice-game-1000/](https://danilziborov.github.io/dice-game-1000/)

---


## ✨ Особенности

- 🎲 **Полная поддержка правил «Тысячи»**  
  Автоматический учёт бочки, ям, болтов, обгонов, паспорта и всех очковых комбинаций.
- ⚙️ **Гибкие настройки партии**  
  Перед началом игры можно включить/отключить болты, ямы, обгоны, задать «паспорт» (очки для входа) и другие параметры.
- 📊 **Журнал и статистика**  
  Сохраняются все завершённые партии с датами, именами игроков и финальными счетами. Краткая статистика всегда под рукой.
- 📖 **Встроенный справочник**  
  Раздел с визуальными таблицами комбинаций и подробными правилами — всегда под рукой, не нужно искать в интернете.
- 💾 **Экспорт / Импорт**  
  История партий сохраняется в файл `.json` и восстанавливается при необходимости.
- 📱 **PWA**  
  Приложение может быть установлено ка кна компьютер, так и на мобильные устройства на базе iOS и Android.
- 🔒 **Приватность и офлайн**  
  Все данные хранятся на вашем устройстве. Никаких серверов, аккаунтов, трекеров.

---

## 🧰 Технологии

- [TypeScript](https://www.typescriptlang.org/) – типизация
- [React 18](https://reactjs.org/) – интерфейс
- [Vite](https://vitejs.dev/) – сборка и дев-сервер
- [TailwindCSS](https://tailwindcss.com/) – стилизация
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) – локальное хранение данных
- [VitePWA](https://vite-pwa-org.netlify.app/) – превращение в PWA

---

## 🚀 Установка и запуск

**Требования**  
- Node.js (версия 18 или выше)  
- npm или yarn  

**Шаги**  

1. Клонируйте репозиторий:
   git clone https://github.com/DanilZiborov/dice-game-1000.git
   cd dice-game-1000

2. Установите зависимости:
   npm install

3. Запустите в режиме разработки:
   npm run dev

4. Сборка для продакшена:
   npm run build

5. Предпросмотр собранного приложения:
   npm run preview

6. Деплой на GitHub Pages (ваш форк):
   npm run deploy

**Установка как PWA**  

1. Откройте демо-версию в браузере (Chrome, Edge, Safari).  
2. Нажмите на иконку «Установить» в адресной строке или в меню браузера.  
3. Приложение появится на рабочем столе / в списке программ и будет работать без интернета.

---

## 🧭 Планы по развитию

- [ ] Деплой на хостинге
- [ ] Развёртка Telegram Web App и telegram-бота
- [ ] Добавление смешных мемов и гифок для разных игровых ситуаций

---

## 📄 Лицензия и контакты

**Лицензия:** MIT  
**Автор:** [DanilZiborov](https://github.com/DanilZiborov)

⭐ Если вам понравился проект, поставьте звезду на GitHub – это очень помогает!
