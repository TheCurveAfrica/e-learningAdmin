import { useQuery, useQueryClient } from '@tanstack/react-query';
import { onboardingApiService } from '../services/api-service';
import { LoginRequest, ForgotPasswordRequest, VerifyEmailRequest, ResetPasswordRequest, ResendCodeRequest, LoginResponse } from '@/types/auth-type';
import useSend from './use-send';

export const QUERY_KEYS = {
    auth: {
        currentAdmin: ['auth', 'currentAdmin'] as const,
    },
} as const;


export const useLogin = () => {
    const queryClient = useQueryClient();

    return useSend<LoginRequest, LoginResponse>({
        url: '/auth/admins/login',
        method: 'post',
        hasAuth: false,
        successMessage: 'Login successful!',
        onSuccess: (response) => {
            console.log(response)
            if (response) {
                localStorage.setItem(import.meta.env.VITE_TOKEN, response.accessToken);
                localStorage.setItem(import.meta.env.VITE_TOKEN_REFRESH, response.refreshToken);
            }
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.currentAdmin });
        },
        errorMessage: 'Login failed. Please try again.',
    });
};

export const useForgotPassword = () => {
    return useSend<ForgotPasswordRequest, { message: string }>({
        url: '/auth/admins/forgot-password',
        method: 'post',
        hasAuth: false,
        successMessage: 'Password reset email sent successfully!',
        errorMessage: 'Failed to send password reset email.',
    });
};


export const useVerifyEmail = () => {
    return useSend<VerifyEmailRequest, { token?: string; message: string }>({
        url: '/auth/admins/reset-password/verify-otp',
        method: 'post',
        hasAuth: false,
        successMessage: 'Email verified successfully!',
        errorMessage: 'Invalid verification code. Please try again.',
    });
};


export const useResetPassword = () => {
    return useSend<ResetPasswordRequest, { message: string }>({
        url: '/auth/admins/reset-password',
        method: 'post',
        hasAuth: false,
        successMessage: 'Password reset successfully!',
        errorMessage: 'Failed to reset password. Please try again.',
    });
};


export const useResendCode = () => {
    return useSend<ResendCodeRequest, { message: string }>({
        url: '/auth/resend-code',
        method: 'post',
        hasAuth: false,
        successMessage: 'Verification code sent successfully!',
        errorMessage: 'Failed to resend verification code.',
    });
};

export const useCurrentAdmin = () => {
    return useQuery({
        queryKey: QUERY_KEYS.auth.currentAdmin,
        queryFn: () => onboardingApiService.getCurrentAdmin(),
        enabled: onboardingApiService.isAuthenticated(),
        staleTime: 5 * 60 * 1000,
        retry: (failureCount, error: any) => {
            if (error?.status === 401) return false;
            return failureCount < 3;
        },
    });
};


export const useAuth = () => {
    const currentAdminQuery = useCurrentAdmin();
    const isAuthenticated = onboardingApiService.isAuthenticated();

    return {
        isAuthenticated,
        user: currentAdminQuery.data?.data || null,
        isLoading: currentAdminQuery.isLoading,
        isError: currentAdminQuery.isError,
        error: currentAdminQuery.error,
    };
};


export const useAuthUtils = () => {
    const queryClient = useQueryClient();

    const logout = () => {
        localStorage.removeItem(import.meta.env.VITE_TOKEN);
        localStorage.removeItem(import.meta.env.VITE_TOKEN_REFRESH);
        queryClient.clear();
        window.location.href = '/login';
    };

    return {
        isAuthenticated: onboardingApiService.isAuthenticated(),
        getStoredToken: onboardingApiService.getStoredToken(),
        getStoredRefreshToken: onboardingApiService.getStoredRefreshToken(),
        logout,
    };
};
