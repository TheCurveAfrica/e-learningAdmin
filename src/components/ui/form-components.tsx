import React from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
    required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    error,
    required = false,
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-3">
            <label htmlFor={props.id} className="block text-base font-medium text-[#2D2F30]">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                {...props}
                className={`w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8500] focus:border-transparent ${error ? 'border-red-300 focus:ring-red-500' : ''
                    } ${className}`}
            />
            {error && <p className="text-sm text-red-600">{error.message}</p>}
        </div>
    );
};

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: FieldError;
    required?: boolean;
    options: { value: string; label: string }[];
}

export const FormSelect: React.FC<FormSelectProps> = ({
    label,
    error,
    required = false,
    options,
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-1">
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                {...props}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${error ? 'border-red-300 focus:ring-red-500' : ''
                    } ${className}`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-sm text-red-600">{error.message}</p>}
        </div>
    );
};
