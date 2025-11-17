import type { JSX } from 'react';
import { useRef } from 'react';
import { ArrowIcon } from 'components/icons';

export const Landing = (): JSX.Element => {
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleScrollDown = (): void => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-full">
      {/* Первый экран */}
      <section className="flex min-h-full flex-col justify-between pb-20">
        <div>
          <h1 className="my-5 text-3xl">1К Журнал</h1>
          <p className="mb-8 text-lg leading-relaxed">
            Приложение для игры в «Тысячу» на костях. Автоматически считает очки, полностью избавляя от ручного
            подсчёта. Программа учитывает все правила: болты, ямы, обгон и другие нюансы. Перед игрой можно настроить
            параметры под свои условия.
          </p>
        </div>

        <div className="mb-20 flex justify-center">
          <div className="rounded-md border border-cyber-secondary p-6 leading-relaxed">
            <p className="mb-4 text-xl font-semibold">Как установить приложение</p>
            <div className="space-y-6">
              <div>
                <p className="font-medium">На Android:</p>
                <ol className="mt-2 list-decimal space-y-2 pl-6">
                  <li className="leading-relaxed">Откройте сайт в браузере</li>
                  <li className="leading-relaxed">
                    Нажмите на меню с тремя точками <code className="rounded bg-gray-500 px-1 py-0.5">⋮</code>
                  </li>
                  <li className="leading-relaxed">Выберите «Добавить на главный экран»</li>
                </ol>
              </div>

              <div>
                <p className="font-medium">На iOS:</p>
                <ol className="mt-2 list-decimal space-y-2 pl-6">
                  <li className="leading-relaxed">Откройте сайт в браузере</li>
                  <li className="leading-relaxed">Нажмите кнопку «Поделиться»</li>
                  <li className="leading-relaxed">Выберите «На экран „Домой“»</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div onClick={handleScrollDown} className="hidden cursor-pointer flex-col items-center justify-center md:flex">
          <p className="mb-2">подробнее</p>
          <div className="animate-pulse-arrow">
            <ArrowIcon direction="down" />
          </div>
        </div>
      </section>

      {/* Второй экран */}
      <section className="min-h-full pt-12">
        <section className="flex h-full flex-col items-center">
          <div ref={detailsRef} className="w-full max-w-2xl space-y-8">
            <h3 className="mb-4 pb-2 text-2xl font-bold">Подробнее о приложении</h3>
            <ul className="list-disc space-y-3 pl-5">
              <li className="leading-relaxed">Работает без интернета — играйте где угодно.</li>
              <li className="leading-relaxed">Поддерживает резервные копии через файл.</li>
              <li className="leading-relaxed">Гарантирует приватность — данные никуда не передаются.</li>
              <li className="leading-relaxed">Правила и комбинации всегда у вас под рукой.</li>
            </ul>

            <div className="mt-8">
              <h3 className="mb-4 pb-2 text-xl font-bold">Технологии</h3>
              <ul className="list-disc space-y-3 pl-5">
                <li className="leading-relaxed">Фронтенд: React + TypeScript.</li>
                <li className="leading-relaxed">Стили: Tailwind CSS.</li>
                <li className="leading-relaxed">Хранение данных: IndexedDB.</li>
                <li className="leading-relaxed">Сборка: Vite + плагины.</li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 pb-2 text-xl font-bold">Планы</h3>
              <ul className="list-disc space-y-3 pl-5">
                <li className="leading-relaxed">Журнал завершённых партий</li>
                <li className="leading-relaxed">История набора очков в течение партии и график прогресса.</li>
                <li className="leading-relaxed">Забавные игровые титулы по итогам партии.</li>
                <li className="leading-relaxed">Светлая тема.</li>
              </ul>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
