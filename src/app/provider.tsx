import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { queryConfig } from '../lib/react-query';


export default function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: queryConfig,
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        color: '#374151',
                    },
                }}
            />
            {/* React Query DevTools - only shows in development */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
