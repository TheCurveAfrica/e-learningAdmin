import axios from 'axios';
import { toast } from 'sonner';

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: any) => void;
    reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });

    failedQueue = [];
};

export function createApiClient(hasAuth?: boolean) {
    const apiClient = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: false,
    });

    apiClient.interceptors.request.use((config) => {
        if (hasAuth) {
            const token = localStorage.getItem(import.meta.env.VITE_TOKEN);
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
                config.headers['Accept'] = 'application/json';
            }
        }

        return config;
    });

    apiClient.interceptors.response.use(
        (response) => response.data,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry && hasAuth) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                const refreshToken = localStorage.getItem(import.meta.env.VITE_TOKEN_REFRESH);

                if (refreshToken) {
                    try {
                        const refreshResponse = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
                            refreshToken
                        });

                        const { token: newToken, refreshToken: newRefreshToken } = refreshResponse.data.data;

                        localStorage.setItem(import.meta.env.VITE_TOKEN, newToken);
                        if (newRefreshToken) {
                            localStorage.setItem(import.meta.env.VITE_TOKEN_REFRESH, newRefreshToken);
                        }

                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                        processQueue(null, newToken);

                        isRefreshing = false;

                        return apiClient(originalRequest);
                    } catch (refreshError) {
                        processQueue(refreshError, null);
                        isRefreshing = false;

                        localStorage.removeItem(import.meta.env.VITE_TOKEN);
                        localStorage.removeItem(import.meta.env.VITE_TOKEN_REFRESH);

                        toast.error('Session expired. Please login again.');
                        window.location.href = '/login';

                        return Promise.reject(refreshError);
                    }
                } else {
                      isRefreshing = false;
                    localStorage.removeItem(import.meta.env.VITE_TOKEN);
                    toast.error('Session expired. Please login again.');
                    window.location.href = '/login';
                }
            }

            return Promise.reject(error.response?.data || error);
        }
    );

    return apiClient;
}
