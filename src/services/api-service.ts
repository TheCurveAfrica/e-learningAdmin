import { LoginRequest, LoginResponse, ForgotPasswordRequest, VerifyEmailRequest, ResetPasswordRequest, ResendCodeRequest } from '@/types/auth-type';
import { createApiClient } from '../lib/api-client';
import { ApiResponse } from '../types/api';

export class OnboardingApiService {
    private apiClient = createApiClient(false);
    private authApiClient = createApiClient(true);

  
    async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        try {
            const response = await this.apiClient.post('/auth/login', credentials) as ApiResponse<LoginResponse>;

            if (response.success && response.data.token) {
                localStorage.setItem(import.meta.env.VITE_TOKEN, response.data.token);
            }

            return response;
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    async forgotPassword(request: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
        try {
            const response = await this.apiClient.post('/auth/forgot-password', request) as ApiResponse<{ message: string }>;
            return response;
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    async verifyEmail(request: VerifyEmailRequest): Promise<ApiResponse<{ token?: string; message: string }>> {
        try {
            const response = await this.apiClient.post('/auth/verify-email', request) as ApiResponse<{ token?: string; message: string }>;
            return response;
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    async resetPassword(request: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> {
        try {
            const response = await this.apiClient.post('/auth/reset-password', request) as ApiResponse<{ message: string }>;
            return response;
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    async resendVerificationCode(request: ResendCodeRequest): Promise<ApiResponse<{ message: string }>> {
        try {
            const response = await this.apiClient.post('/auth/resend-code', request) as ApiResponse<{ message: string }>;
            return response;
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    async logout(): Promise<void> {
            localStorage.removeItem(import.meta.env.VITE_TOKEN_);
    }

    async getCurrentAdmin(): Promise<ApiResponse<LoginResponse['user']>> {
        try {
            const response = await this.authApiClient.get('/auth/profile') as ApiResponse<LoginResponse['user']>;
            return response;
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('adminToken');
        return !!token;
    }

    getStoredToken(): string | null {
        return localStorage.getItem('adminToken');
    }

    private handleApiError(error: any): Error {
        if (error?.message) {
            return new Error(error.message);
        }
        if (error?.errors) {
            const errorMessages = Object.values(error.errors).flat().join(', ');
            return new Error(errorMessages);
        }
        return new Error('An unexpected error occurred. Please try again.');
    }
}

export const onboardingApiService = new OnboardingApiService();
