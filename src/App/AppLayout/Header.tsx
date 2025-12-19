import { type JSX, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

type MenuItem = {
  label: string;
  link: string;
  icon: JSX.Element | null;
};

const MENU_ITEMS: MenuItem[] = [
  { label: 'Инфо', link: '/landing', icon: null },
  { label: 'Играть', link: '/app/game', icon: null },
  { label: 'Завершённые партии', link: '/finished', icon: null },
  { label: 'Правила', link: '/rules', icon: null },
  { label: 'Комбинации', link: '/combos', icon: null },
  { label: 'Импорт и экспорт', link: '/app/data-transfer', icon: null },
];

type Props = {
  maxWidth: string;
};

export const Header = ({ maxWidth }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  // Управляет размонтированием оверлея
  useEffect(() => {
    if (isOpen) {
      setOverlayVisible(true);
    } else {
      // ждём завершения fade-out
      const timer = setTimeout(() => setOverlayVisible(false), 250);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="fixed top-0 left-0 z-100 w-full bg-cyber-background">
      <div className={clsx(maxWidth, 'relative mx-auto w-full transition-[max-width] duration-500')}>
        <header className="flex items-center justify-between p-4">
          <button
            className="flex cursor-pointer flex-col items-center justify-center gap-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="h-0.5 w-6 bg-cyber-secondary shadow-lg" />
            <div className="h-0.5 w-6 bg-cyber-secondary shadow-lg" />
            <div className="h-0.5 w-6 bg-cyber-secondary shadow-lg" />
          </button>
        </header>

        {/* Меню */}
        <div
          className={clsx(
            'absolute top-full left-0 z-[120] w-full overflow-hidden border-b border-cyber-secondary bg-cyber-background transition-[max-height] duration-500',
            isOpen ? 'max-h-[500px]' : 'max-h-0',
          )}
        >
          <nav className="flex flex-col p-4">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className="flex items-center gap-2 rounded px-4 py-2 text-cyber-secondary transition-colors hover:bg-cyber-secondary/10"
                onClick={() => setIsOpen(false)}
              >
                {item.icon && <span>{item.icon}</span>}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Затемняющий оверлей */}
      {overlayVisible && (
        <div
          className={clsx(
            'fixed inset-0 z-[110] bg-black transition-opacity duration-300',
            isOpen ? 'opacity-30' : 'opacity-0',
          )}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
