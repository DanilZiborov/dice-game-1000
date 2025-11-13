import type { JSX } from 'react';
import { useRef } from 'react';

export const Landing = (): JSX.Element => {
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleScrollDown = (): void => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-full px-4">
      {/* Первый экран */}
      <section className="flex h-full flex-col justify-between pt-4 pb-30">
        <div>
          <h1 className="mb-4 text-3xl">Трекер 1000</h1>
          <p className="mb-8 text-lg leading-relaxed">
            Приложение позволяет вести счёт в игре на костях «Тысяча». Программа автоматически рассчитывает очки и
            учитывает все вводные (болты, ямы, обгон и т.д.). Есть возможность настроить правила партии под себя.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="rounded-md border border-cyber-secondary p-6 leading-relaxed">
            Чтобы установить приложение:
            <ul className="mt-2 list-inside list-disc space-y-1 text-left">
              <li>
                <strong>На iPhone (Safari):</strong> нажмите «Поделиться» → «На экран Домой».
              </li>
              <li>
                <strong>На Android (Chrome):</strong> откройте меню «⋮» → «Добавить на главный экран».
              </li>
            </ul>
          </div>
        </div>

        <button onClick={handleScrollDown} className="transition" aria-label="Подробнее">
          ↓
        </button>
      </section>

      {/* Второй экран */}
      <section className="h-full pt-4">
        <div ref={detailsRef} className="space-y-6">
          <h2 className="mb-2 text-2xl">Подробнее о приложении</h2>
          <p className="leading-relaxed">
            «Запись счёта 1000» создана для тех, кто любит настольные игры и ценит порядок. Приложение хранит ваши
            результаты локально и работает без интернета, чтобы ничто не отвлекало от партии. Все функции доступны сразу
            после установки, а интерфейс интуитивно понятен даже новичкам.
          </p>

          <div>
            <h3 className="mt-8 mb-2 text-xl font-semibold">Технологический стек</h3>
            <p className="leading-relaxed">
              Приложение построено на современных веб-технологиях: React, TypeScript, Tailwind CSS и Vite. Данные
              сохраняются в IndexedDB, что обеспечивает автономную работу и мгновенный доступ без сети.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
