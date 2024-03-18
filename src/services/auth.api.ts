import type { LoginRequest, AuthTokens, refresh_tokenRequest } from "@/types/auth"
import { client } from "./client"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function authenticate(loginRequest: LoginRequest): Promise<AuthTokens> {
    return client.post(`${BASE_URL}/auth/login`, loginRequest)
}

export async function refresh(refresh_token: refresh_tokenRequest): Promise<AuthTokens> {
    return client.post(`${BASE_URL}/auth/refresh`, refresh_token)
}