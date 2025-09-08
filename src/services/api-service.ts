import { AdminUser } from '@/types/auth-type';
import { createApiClient } from '../lib/api-client';
import { ApiResponse } from '../types/api';

export class OnboardingApiService {
    private authApiClient = createApiClient(true);

    async getCurrentAdmin(): Promise<ApiResponse<AdminUser>> {
        try {
            const response = await this.authApiClient.get('/auth/profile') as ApiResponse<AdminUser>;
            return response;
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    async logout(): Promise<void> {
        localStorage.removeItem(import.meta.env.VITE_TOKEN);
        localStorage.removeItem(import.meta.env.VITE_TOKEN_REFRESH);
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem(import.meta.env.VITE_TOKEN);
        const refreshToken = localStorage.getItem(import.meta.env.VITE_TOKEN_REFRESH);
        return !!(token || refreshToken);
    }

    getStoredToken(): string | null {
        return localStorage.getItem(import.meta.env.VITE_TOKEN);
    }

    getStoredRefreshToken(): string | null {
        return localStorage.getItem(import.meta.env.VITE_TOKEN_REFRESH);
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
