export interface LoginRequest {
    email: string;
    password: string;
}

export interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: AdminUser;
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
    newPassword: string;
    confirmPassword: string;
}

export interface ResendCodeRequest {
    email: string;
}