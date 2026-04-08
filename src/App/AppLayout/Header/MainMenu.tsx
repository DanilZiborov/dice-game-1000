import { type JSX } from 'react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

type MenuItem = {
  label: string;
  link: string;
};

const MENU_ITEMS: MenuItem[] = [
  { label: 'Главная', link: '/landing' },
  { label: 'Играть', link: '/app/game' },
  { label: 'История партий', link: '/finished' },
  { label: 'Правила', link: '/rules' },
  { label: 'Комбинации', link: '/combos' },
  { label: 'Импорт и экспорт', link: '/app/data-transfer' },
  { label: 'Настройки', link: '/app/settings' },
  { label: 'Инфо', link: '/info' },
];

type MainMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MainMenu = ({ isOpen, onClose }: MainMenuProps): JSX.Element => {
  return (
    <div
      className={clsx(
        'absolute top-full left-0 z-120 w-full overflow-hidden border-b border-cyber-secondary bg-cyber-background duration-500',
        isOpen ? 'max-h-125' : 'max-h-0',
      )}
    >
      <nav className="flex flex-col p-4">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.link}
            to={item.link}
            className="flex items-center gap-2 rounded px-4 py-2 text-cyber-secondary hover:bg-cyber-secondary/10"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
