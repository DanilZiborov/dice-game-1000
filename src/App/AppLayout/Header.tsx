import { type JSX, useState } from 'react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

type MenuItem = {
  label: string;
  link: string;
  icon: JSX.Element | null;
};

const MENU_ITEMS: MenuItem[] = [
  { label: 'Инфо', link: '/landing', icon: null },
  { label: 'Игра', link: '/app/game', icon: null },
  { label: 'Правила', link: '/rules', icon: null },
  { label: 'Комбинации', link: '/combos', icon: null },
  { label: 'Импорт и экспорт', link: '/app/data-transfer', icon: null },
];

type Props = {
  maxWidth: string;
};

export const Header = ({ maxWidth }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 z-10 flex w-full items-center justify-center">
      <div className={clsx(maxWidth, 'w-full transition-[max-width] duration-500')}>
        <header className="flex items-center justify-between bg-cyber-background p-4">
          <button
            className="flex cursor-pointer flex-col items-center justify-center gap-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="h-0.5 w-6 bg-cyber-secondary shadow-lg" />
            <div className="h-0.5 w-6 bg-cyber-secondary shadow-lg" />
            <div className="h-0.5 w-6 bg-cyber-secondary shadow-lg" />
          </button>
        </header>
        <div
          className={clsx(
            'overflow-hidden border-b border-cyber-secondary bg-cyber-background transition-[max-height] duration-500',
            isOpen ? 'max-h-[500px]' : 'max-h-0',
          )}
        >
          <nav className="flex flex-col bg-cyber-background p-4">
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
    </div>
  );
};
