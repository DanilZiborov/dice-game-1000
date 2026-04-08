import type { JSX } from 'react';
import qrCode from 'assets/qr_link.svg';
import { PrimaryButton } from 'components';
import { useNavigate } from 'react-router-dom';

export const Landing = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-col items-center justify-around py-4">
      <div className="mb-8 flex flex-col items-center">
        <p className="mt-4 mb-5 text-center text-lg font-bold">Отсканируйте QR-код, чтобы поделиться приложением</p>
        {/* Рамка вокруг QR-кода */}
        <div className="border border-cyber-secondary p-2">
          <img className="block h-37.5 w-37.5" src={qrCode} alt="qr-код для перехода на сайт" />
        </div>
      </div>

      <div className="mb-10 w-50 font-app">
        <PrimaryButton className="w-full" onClick={() => navigate('/app/game')}>
          Играть
        </PrimaryButton>
      </div>

      <div className="mb-10 flex justify-center">
        <div className="rounded-md border border-cyber-secondary p-6 leading-relaxed">
          <p className="mb-4 text-xl font-semibold">Как установить приложение</p>
          <div className="space-y-6">
            <div>
              <p className="font-medium">На Android:</p>
              <ol className="mt-2 list-decimal space-y-2 pl-6">
                <li className="leading-relaxed">
                  Нажмите на меню с тремя точками&nbsp;<code className="rounded bg-gray-500 px-1 py-0.5">⋮</code>
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
    </div>
  );
};
