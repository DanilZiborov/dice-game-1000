import { type JSX, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { BurgerIcon } from 'components/icons';
import { IconButton } from 'components';
import { Dice5 } from 'components/icons/dices';
import { MainMenu } from 'App/AppLayout/Header/MainMenu';

type Props = {
  maxWidth: string;
};

export const Header = ({ maxWidth }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOverlayVisible(true);
    } else {
      const timer = setTimeout(() => setOverlayVisible(false), 250);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="fixed top-0 left-0 z-100 w-full bg-cyber-background">
      <div className={clsx(maxWidth, 'relative mx-auto w-full transition-[max-width] duration-500')}>
        <header className="flex items-center justify-between px-4 py-2.5">
          <button className="flex cursor-pointer items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
            <BurgerIcon className="h-3.5 w-6 text-cyber-secondary drop-shadow-lg" />
          </button>
          <IconButton className="h-[25px] w-[25px] border-none">
            <Dice5 className="h-[25px] w-[25px] fill-cyber-primary" />
          </IconButton>
        </header>

        <MainMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>

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
