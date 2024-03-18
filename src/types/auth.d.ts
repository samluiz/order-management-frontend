export interface LoginRequest {
    username: string
    password: string
}

export interface AuthTokens {
    token: string
    refresh_token: string
}

export interface refresh_tokenRequest {
    refresh_token: string | null
}