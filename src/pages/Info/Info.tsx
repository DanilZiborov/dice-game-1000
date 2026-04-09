import { type JSX } from 'react';
import { SecondaryButton } from 'components';
// eslint-disable-next-line import/no-unresolved
import { useRegisterSW } from 'virtual:pwa-register/react';

export const Info = (): JSX.Element => {
  const { needRefresh, updateServiceWorker } = useRegisterSW();

  const handleUpdate = (): void => {
    // true → активирует новый SW и перезагрузит страницу
    void updateServiceWorker(true);
  };

  return (
    <div className="mx-auto my-10">
      <div>
        <h1 className="mb-2 text-2xl">Журнал Партий 1000</h1>
        <p className="mb-8 leading-relaxed">
          Приложение для игры в «Тысячу» на костях. Помогает фиксировать набранные очки. Рассчитывает итоговый результат
          с учётом всех игровых правил.
        </p>
      </div>

      <div className="my-6 border border-cyber-secondary p-4">
        {!needRefresh[0] && (
          <p className="text-cyber-secondary">Вы используете последнюю версию приложения, обновление не требуется.</p>
        )}

        {needRefresh[0] && (
          <div className="flex flex-col gap-2">
            <p className="text-cyber-gold">Появилась новая версия приложения!</p>

            <SecondaryButton className="h-8 w-40" onClick={handleUpdate}>
              Обновить
            </SecondaryButton>
          </div>
        )}
      </div>

      <div className="w-full max-w-2xl space-y-4">
        <p className="self-start">
          Спасибо сайту{' '}
          <a className="text-cyber-secondary underline" href="https://selosovetov.ru/2016/11/25/igra-v-1000/">
            {' '}
            «Село советов»
          </a>{' '}
          за подробные правила игры.
        </p>
        <p>Приложение создал Данил Зиборов в 2026 году.</p>
        <a href="https://github.com/DanilZiborov/dice-game-1000" className="text-cyber-secondary underline">
          Проект на Github
        </a>
      </div>
    </div>
  );
};
