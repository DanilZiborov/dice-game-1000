import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useCheckPWAInstalled } from './useCheckPWAInstalled';

export const Landing = (): JSX.Element => {
  const { isPWAInstalled, triggerInstallPrompt } = useCheckPWAInstalled();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-slate-900">Roll 1000</h1>
      <p className="mb-8 max-w-md text-lg text-slate-700">
        Легко веди свои партии в «Тысячу» — счёт, броски кубиков и история игр всегда под рукой. Забудь о бумажках и
        счётчиках, просто кидай кубики и наслаждайся игрой!
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={triggerInstallPrompt}
          disabled={isPWAInstalled}
          className={clsx(
            'rounded-lg px-6 py-3 font-medium transition-colors',
            isPWAInstalled
              ? 'cursor-not-allowed bg-green-200 text-green-900'
              : 'bg-blue-600 text-white hover:bg-blue-700',
          )}
        >
          {isPWAInstalled ? 'Приложение установлено' : 'Установить приложение'}
        </button>

        <button
          onClick={() => navigate('/app/game')}
          className="rounded-lg bg-slate-200 px-6 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-300"
        >
          Перейти в веб-версию
        </button>
      </div>
    </div>
  );
};
