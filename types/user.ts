export interface User {
    username: string;
    email: string;
    avatar: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
}

export interface CheckSessionRequest {
    success: boolean;
}