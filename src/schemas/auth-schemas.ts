import { ForgotPasswordRequest, LoginRequest, VerifyEmailRequest } from '@/types/auth-type';
import { RegisterOptions } from 'react-hook-form';

// Common validation patterns
export const EMAIL_PATTERN = {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address'
};

export const STRONG_PASSWORD_PATTERN = {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
};

export const VERIFICATION_CODE_PATTERN = {
    value: /^[0-9]{6}$/,
    message: 'Please enter a valid 6-digit code'
};


export const loginValidationSchema = {
    email: {
        required: 'Email is required',
        pattern: EMAIL_PATTERN
    } as RegisterOptions<LoginRequest, 'email'>,
    password: {
        required: 'Password is required',
        minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
        }
    } as RegisterOptions<LoginRequest, 'password'>
};

export const forgotPasswordValidationSchema = {
    email: {
        required: 'Email is required',
        pattern: EMAIL_PATTERN
    } as RegisterOptions<ForgotPasswordRequest, 'email'>
};

export const verifyEmailValidationSchema = {
    code: {
        required: 'Verification code is required',
        pattern: VERIFICATION_CODE_PATTERN
    } as RegisterOptions<VerifyEmailRequest, 'code'>
};

export interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

export const resetPasswordValidationSchema = {
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
        },
        pattern: STRONG_PASSWORD_PATTERN
    } as RegisterOptions<ResetPasswordFormData, 'password'>,
    confirmPassword: {
        required: 'Please confirm your password',
    } as RegisterOptions<ResetPasswordFormData, 'confirmPassword'>
};

export const confirmPasswordValidationSchema = (password: string): RegisterOptions<ResetPasswordFormData, 'confirmPassword'> => ({
    required: 'Please confirm your password',
    validate: (value: string) => value === password || 'Passwords do not match'
});

// Common error messages
export const VALIDATION_MESSAGES = {
    REQUIRED_EMAIL: 'Email is required',
    INVALID_EMAIL: 'Invalid email address',
    REQUIRED_PASSWORD: 'Password is required',
    PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
    PASSWORD_TOO_SHORT_STRONG: 'Password must be at least 8 characters',
    WEAK_PASSWORD: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
    REQUIRED_CODE: 'Verification code is required',
    INVALID_CODE: 'Please enter a valid 6-digit code',
    CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password'
} as const;
