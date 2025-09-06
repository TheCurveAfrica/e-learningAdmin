import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosRequestConfig, Method } from 'axios';
import { toast } from 'sonner';

import { createApiClient } from '@/lib/api-client';
import { QueryResponse } from '@/types/api';
import { generateQueryKey } from '@/utils/format';

type AllowedMethodType = 'post' | 'put' | 'delete' | 'get' | 'patch';

interface IUseSendOptions<TData = unknown, RequestBodyType = unknown> {
    url: string;
    method: Extract<Method, AllowedMethodType>;
    hasAuth?: boolean;
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    invalidateKeys?:
    [];
    config?: AxiosRequestConfig<RequestBodyType>;
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
}: IUseSendOptions<TData, QueryResponse<RequestBodyType>>) {
    const queryClient = useQueryClient();
    const apiClient = createApiClient(hasAuth);

    const parseResponseData = (data?: QueryResponse<TData>) => {
        if (!data) return;
        if (!schema) return data?.data;
        return schema.parse(data?.data);
    };

    return useMutation({
        mutationFn: async (variables: RequestBodyType) => {
            const response = await apiClient[method]<QueryResponse<TData>>(
                url,
                variables,
                config
            );
            return response.data;
        },
        onSuccess: (data) => {
            const keys = invalidateKeys || url.split('/').filter((key) => key !== '');
            keys.forEach((key) => {
                queryClient.invalidateQueries({ queryKey: generateQueryKey(key) });
            });

            if (showSuccessMessage) {
                const message = successMessage || data.message;
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
