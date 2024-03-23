import type { LoginRequest, AuthTokens, refreshTokenRequest } from "@/types/auth"
import { client } from "./client"

export async function authenticate(loginRequest: LoginRequest): Promise<AuthTokens> {
    return client.post(`/auth/login`, loginRequest)
}

export async function refresh(refresh_token: refreshTokenRequest): Promise<AuthTokens> {
    return client.post(`/auth/refresh`, refresh_token)
}