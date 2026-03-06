import type { JSX } from 'react';
import qrCode from 'assets/qr_link.svg';

export const Landing = (): JSX.Element => {
  return (
    <div className="py-4">
      {/* Первый экран */}
      <section className="flex min-h-full flex-col">
        <div>
          <h1 className="mb-2 text-2xl">Журнал Партий 1000</h1>
          <p className="mb-8 leading-relaxed">
            Приложение для игры в «Тысячу» на костях. Даёт возможность фиксировать набранные очки. Рассчитывает итоговый
            результат с учётом всех игровых правил.
          </p>
        </div>

        <div className="mb-8 flex flex-col items-center">
          {/* Рамка вокруг QR-кода */}
          <div className="border border-cyber-secondary p-2">
            <img className="block h-[150px] w-[150px]" src={qrCode} alt="qr-код для перехода на сайт" />
          </div>
          {/* Текст под рамкой */}
          <p className="mt-4 text-center text-lg font-bold">Отсканируйте QR-код, чтобы поделиться приложением</p>
        </div>

        <div className="mb-20 flex justify-center">
          <div className="rounded-md border border-cyber-secondary p-6 leading-relaxed">
            <p className="mb-4 text-xl font-semibold">Как установить приложение</p>
            <div className="space-y-6">
              <div>
                <p className="font-medium">На Android:</p>
                <ol className="mt-2 list-decimal space-y-2 pl-6">
                  <li className="leading-relaxed">
                    Нажмите на меню с тремя точками <code className="rounded bg-gray-500 px-1 py-0.5">⋮</code>
                  </li>
                  <li className="leading-relaxed">Выберите «Добавить на главный экран»</li>
                </ol>
              </div>

              <div>
                <p className="font-medium">На iOS:</p>
                <ol className="mt-2 list-decimal space-y-2 pl-6">
                  <li className="leading-relaxed">Нажмите кнопку «Поделиться»</li>
                  <li className="leading-relaxed">Выберите «На экран „Домой“»</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex h-full flex-col items-center">
        <div className="w-full max-w-2xl space-y-4">
          <h3 className="mb-4 pb-2 text-2xl font-bold">Подробнее о приложении</h3>
          <ul className="mb-4 list-disc space-y-3 pl-5">
            <li className="leading-relaxed">Работает без интернета</li>
            <li className="leading-relaxed">Поддерживает резервные копии через файл.</li>
            <li className="leading-relaxed">Гарантирует приватность — данные никуда не передаются.</li>
            <li className="leading-relaxed">Правила и комбинации всегда у вас под рукой.</li>
          </ul>

          <p className="self-start">
            Спасибо сайту{' '}
            <a className="text-cyber-secondary underline" href="https://selosovetov.ru/2016/11/25/igra-v-1000/">
              {' '}
              «Село советов»
            </a>{' '}
            за подробные правила игры.{' '}
          </p>
          <p>Приложение создал Данил Зиборов в 2026 году.</p>
          <a href="https://github.com/DanilZiborov/dice-game-1000" className="text-cyber-secondary underline">
            Проект на Github
          </a>
        </div>
      </section>
    </div>
  );
};
