import { type JSX } from 'react';
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

type MainMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MainMenu = ({ isOpen, onClose }: MainMenuProps): JSX.Element => {
  return (
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
            onClick={onClose}
          >
            {item.icon && <span>{item.icon}</span>}
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
