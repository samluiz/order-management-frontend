export interface LoginRequest {
    username: string
    password: string
}

export interface AuthTokens {
    token: string
    refresh_token: string
}

export interface refreshTokenRequest {
    refresh_token: string | null
}