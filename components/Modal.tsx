
import React, { useEffect, useState, useRef } from 'react';
import { XMarkIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [isActive, setIsActive] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
        // Focus trap logic
        if (modalRef.current) {
          const focusableElementsString = 'a[href]:not([disabled]), button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), details:not([disabled]), [tabindex]:not([tabindex="-1"])';
          const focusableElements = Array.from(
            modalRef.current.querySelectorAll(focusableElementsString)
          ) as HTMLElement[];
          
          const firstFocusableElement = focusableElements[0];
          const lastFocusableElement = focusableElements[focusableElements.length - 1];

          // Set initial focus to the close button if available, otherwise the first focusable element.
          (closeButtonRef.current || firstFocusableElement)?.focus();

          const handleTabKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Tab') {
              if (focusableElements.length === 0) { // No focusable elements inside, prevent tabbing out.
                event.preventDefault();
                return;
              }
              if (event.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                  lastFocusableElement?.focus();
                  event.preventDefault();
                }
              } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                  firstFocusableElement?.focus();
                  event.preventDefault();
                }
              }
            }
          };
          
          modalRef.current.addEventListener('keydown', handleTabKeyPress);

          // Cleanup tab key listener specific to this modal instance
          return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', handleEsc);
            modalRef.current?.removeEventListener('keydown', handleTabKeyPress);
            document.body.style.overflow = 'unset';
          };
        }
      }, 50);

      // General cleanup if modalRef.current was not available immediately
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };

    } else {
      const timer = setTimeout(() => {
        setIsActive(false);
        document.body.style.overflow = 'unset';
      }, 300); // Match transition duration
      window.removeEventListener('keydown', handleEsc); // Ensure ESC listener is removed if closed prematurely
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen && !isActive) {
    return null;
  }

  return (
    <div
      ref={modalRef} // Ref for focus trap query and keydown listener
      className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out
                  ${isOpen && isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={`bg-primary-lt dark:bg-primary shadow-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col 
                    transform transition-all duration-300 ease-in-out border border-border-light dark:border-border-dark
                    ${isOpen && isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-border-light dark:border-border-dark">
          {title && <h3 id="modal-title" className="text-xl font-semibold text-text-lt dark:text-light-text">{title}</h3>}
          <button
            ref={closeButtonRef}
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
