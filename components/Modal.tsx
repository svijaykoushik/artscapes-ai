
import React, { useEffect, useState } from 'react';
import { XMarkIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 50); 
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    } else {
      // Delay setting isActive to false to allow for fade-out animation
      const timer = setTimeout(() => {
        setIsActive(false);
        document.body.style.overflow = 'unset';
      }, 300); // Match transition duration
      window.removeEventListener('keydown', handleEsc);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen && !isActive) { // Only return null if not open AND not active (for animation)
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out
                  ${isOpen && isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={`bg-secondary-lt dark:bg-secondary shadow-none overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col 
                    transform transition-all duration-300 ease-in-out border border-border-light dark:border-border-dark
                    ${isOpen && isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-border-light dark:border-border-dark">
          {title && <h3 id="modal-title" className="text-xl font-semibold text-text-lt dark:text-light-text">{title}</h3>}
          <button
            onClick={onClose}
            className="text-text-lt dark:text-light-text hover:text-accent dark:hover:text-accent transition-colors p-1"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-2 sm:p-4 overflow-y-auto flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
