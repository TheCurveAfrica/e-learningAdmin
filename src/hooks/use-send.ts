import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosRequestConfig, Method } from 'axios';
import { toast } from 'sonner';

import { createApiClient } from '@/lib/api-client';
import { generateQueryKey } from '@/utils/format';

type AllowedMethodType = 'post' | 'put' | 'delete' | 'get' | 'patch';

interface IUseSendOptions<TData = unknown> {
    url: string;
    method: Extract<Method, AllowedMethodType>;
    hasAuth?: boolean;
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    invalidateKeys?: string[];
    config?: AxiosRequestConfig;
    showSuccessMessage?: boolean;
    showErrorMessage?: boolean;
    successMessage?: React.ReactNode;
    errorMessage?: React.ReactNode;
    schema?: { parse: (data: unknown) => TData };
}

export default function useSend<RequestBodyType, TData>({
    url,
    method,
    hasAuth = true,
    onError,
    onSuccess,
    invalidateKeys,
    showErrorMessage = true,
    showSuccessMessage = true,
    successMessage,
    errorMessage,
    schema,
    config,
    ...options
}: IUseSendOptions<TData>) {
    const queryClient = useQueryClient();
    const apiClient = createApiClient(hasAuth);

    const parseResponseData = (data: any) => {
        if (!data) return;
        if (!schema) return data?.data || data;
        return schema.parse(data?.data || data);
    };

    return useMutation({
        mutationFn: async (variables: RequestBodyType) => {
            let response;

            if (method === 'get' || method === 'delete') {
                response = await (apiClient as any)[method](url, config);
            } else {
                response = await (apiClient as any)[method](url, variables, config);
            }

            return response;
        },
        onSuccess: (data: any) => {
            const keys = invalidateKeys || url.split('/').filter((key: string) => key !== '');
            keys.forEach((key: string) => {
                queryClient.invalidateQueries({ queryKey: generateQueryKey(key) });
            });

            if (showSuccessMessage) {
                const message = successMessage || data?.message || 'Success!';
                toast.success(message);
            }

            const parsedData = parseResponseData(data);

            if (onSuccess && parsedData) onSuccess(parsedData);
        },
        onError: (error) => {
            if (showErrorMessage) {
                const message = errorMessage || error.message;
                toast.error(message);
            }
            if (onError) onError(error);
        },
        ...options,
    });
}
