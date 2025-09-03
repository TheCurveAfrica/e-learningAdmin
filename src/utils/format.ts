import { QueryKey } from '@tanstack/react-query';

export function generateQueryKey<T>(url: string, params?: T): QueryKey {
    return [url, params].filter(Boolean);
}