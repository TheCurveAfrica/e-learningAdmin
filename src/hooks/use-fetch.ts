import { useCallback, useEffect } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';

import { createApiClient } from '@/lib/api-client';
import { QueryResponse } from '@/types/api';
import { generateQueryKey } from '@/utils/format';

interface IFetchOptions<TData, T = unknown>
    extends Omit<
        UseQueryOptions<AxiosResponse<QueryResponse<TData>>>,
        'queryKey'
    > {
    params?: T;
    showSuccessMessage?: boolean;
    showErrorMessage?: boolean;
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    hasAuth?: boolean;
}

export default function useFetch<TData, T>(
    url: string,
    schema: { parse: (data: unknown) => TData },
    {
        params,
        showSuccessMessage = true,
        showErrorMessage = true,
        successMessage,
        errorMessage,
        onSuccess,
        onError,
        enabled,
        hasAuth = true,
        ...options
    }: IFetchOptions<TData, T> = {}
) {
    const queryKey = generateQueryKey(url, params);

    const apiClient = createApiClient(hasAuth);

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const response = await apiClient.get<QueryResponse<TData>>(url, {
                params,
            });
            return response;
        },
        enabled: !!apiClient && (enabled ?? true),
        ...options,
    });

    const parseResponseData = useCallback(
        (data?: AxiosResponse<QueryResponse<TData>>) => {
            if (!data) return;
            return schema.parse(data?.data.data);
        },
        [schema]
    );

    useEffect(() => {
        if (query.isSuccess && query.data) {
            if (showSuccessMessage) {
                toast.success(successMessage || query.data.data.message);
            }

            const parsedResponseData = parseResponseData(query.data);

            if (onSuccess && parsedResponseData) onSuccess(parsedResponseData);
        }
    }, [
        query.isSuccess,
        query.data,
        onSuccess,
        showSuccessMessage,
        successMessage,
        parseResponseData,
    ]);

    useEffect(() => {
        if (query.isError && query.error) {
            if (showErrorMessage) {
                toast.error(errorMessage || query.error.message);
            }
            if (onError) onError(query.error);
        }
    }, [query.isError, query.error, onError, showErrorMessage, errorMessage]);

    return {
        ...query,
        data: parseResponseData(query.data),
    };
}
