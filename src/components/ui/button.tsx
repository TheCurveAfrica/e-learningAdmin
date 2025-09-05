import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: Variant;
    size?: Size;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    className = '',
    ...props
}) => {
    const variants: Record<Variant, string> = {
        primary: 'bg-[#FB8500] text-white',
        secondary: 'bg-gray-200 text-gray-900',
        ghost: 'hover:bg-gray-100 text-gray-700'
    };

    const sizes: Record<Size, string> = {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    };

    return (
        <button
            className={`inline-flex items-center justify-center rounded-lg cursor-pointer font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FB8500] focus:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
