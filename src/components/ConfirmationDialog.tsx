import type { JSX } from 'react';
import { clsx } from 'clsx';
import { SecondaryButton } from './actionButtons/SecondaryButton';

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  text: string;
  action: () => void;
};

export const ConfirmationDialog = ({ open, onClose, text, action }: ConfirmationDialogProps): JSX.Element | null => {
  const handleOverlayClick = (e: React.MouseEvent): void => {
    const overlay = e.currentTarget as HTMLElement;
    const target = e.target as HTMLElement;

    if (overlay.contains(target) && !overlay.querySelector('.dialog-content')?.contains(target)) {
      onClose();
    }
  };

  return (
    <div
      className={clsx('fixed inset-0 z-50 flex items-center justify-center', open ? 'visible' : 'hidden')}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      tabIndex={-1}
    >
      {/* Оверлей */}
      <div className={clsx('absolute inset-0 bg-black opacity-50 transition-opacity duration-200')} />

      {/* Диалог */}
      <div
        className={clsx(
          'dialog-content relative w-full px-2 py-6',
          'border-t-2 border-b-2 border-cyber-secondary bg-cyber-background',
          'flex flex-col items-center justify-center gap-6 shadow-lg',
        )}
      >
        <p className="text-lg leading-relaxed text-cyber-text" id="dialog-title">
          {text}
        </p>

        <div className="flex gap-4">
          <SecondaryButton
            onClick={() => {
              action();
              onClose();
            }}
          >
            Да
          </SecondaryButton>

          <SecondaryButton onClick={onClose} className="bg-cyber-background">
            Нет
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};
