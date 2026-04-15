import type { JSX } from 'react';
import { PrimaryButton } from 'components';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

const GH_PAGES_URL = 'https://danilziborov.github.io/dice-game-1000/' as const;

export const Landing = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-col items-center justify-around py-4">
      <div className="mb-8 flex flex-col items-center">
        <p className="mt-4 mb-5 text-center text-lg font-bold">Отсканируйте QR-код, чтобы поделиться приложением</p>

        <div className="border border-cyber-secondary p-1">
          <QRCode value={GH_PAGES_URL} size={150} bgColor="#ffffff" fgColor="#000000" />
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
