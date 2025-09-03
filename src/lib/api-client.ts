import axios from 'axios';
import { toast } from 'sonner';

export function createApiClient(hasAuth?: boolean) {
    const apiClient = axios.create({
        baseURL: import.meta.env.VITE_PUBLIC_API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: false,
    });

    apiClient.interceptors.request.use((config) => {
        if (hasAuth) {
            const token = localStorage.getItem('adminToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
                config.headers['Accept'] = 'application/json';
            }
        }

        return config;
    });

    apiClient.interceptors.response.use(
        (response) => response.data,
        (error) => {
            if (error.response?.status === 401) {
                const searchParams = new URLSearchParams();
                toast.error(error.response.message);
                const redirectTo =
                    searchParams.get('redirectTo') || window.location.pathname;
                window.location.href = redirectTo;
            }
            return Promise.reject(error.response.data);
        }
    );

    return apiClient;
}
