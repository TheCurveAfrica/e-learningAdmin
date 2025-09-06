import React, { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    size?: ModalSize;
    title?: string;
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    footer?: ReactNode;
    className?: string;
    overlayClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    size = 'md',
    title,
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    footer,
    className = '',
    overlayClassName = '',
}) => {
    useEffect(() => {
        if (!isOpen || !closeOnEscape) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeOnEscape, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes: Record<ModalSize, string> = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full mx-4'
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
            onClose();
        }
    };

    const modalContent = (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
            onClick={handleBackdropClick}
        >
            <div className="fixed inset-0 bg-black opacity-50 transition-opacity" />

            <div
                className={`relative bg-white rounded-lg shadow-xl w-full ${sizes[size]} max-h-[90vh] flex flex-col ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        {title && (
                            <h2 className="text-lg font-semibold text-gray-900">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-md p-1"
                                aria-label="Close modal"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>

                {footer && (
                    <div className="p-6 border-t border-gray-200">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default Modal;
