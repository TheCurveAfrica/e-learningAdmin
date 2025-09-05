export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
    token: string;
    expiresIn: number;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface VerifyEmailRequest {
    email: string;
    code: string;
}

export interface ResetPasswordRequest {
    email: string;
    password: string;
    token?: string;
}

export interface ResendCodeRequest {
    email: string;
}
