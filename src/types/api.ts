export type QueryResponse<T> = {
    data: T;
    status: number;
    message: string;
};

export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
    status: number;
    success: boolean;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export class BaseApiService {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected getUrl(endpoint: string): string {
        return `${this.baseUrl}${endpoint}`;
    }
}
