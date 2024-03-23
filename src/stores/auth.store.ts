import router from "@/router";
import { authenticate, refresh } from "@/services/auth.api";
import type { AuthTokens, LoginRequest } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserInfo } from "@/types/user";
import { getUserInfo } from "@/services/user.api";
import { getTokens } from "@/utils/tokens";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<UserInfo | null>(null)
    const tokens = ref<AuthTokens | null>(null)
    const refreshTokenTimeout = ref<number | null>(null)

    const login = async (username: string, password: string) => {
        const loginRequest: LoginRequest = {
            username,
            password,
        }

        const tokenResponse = await authenticate(loginRequest)
        tokens.value = tokenResponse
        localStorage.setItem('token', tokenResponse.token)
        localStorage.setItem('refresh_token', tokenResponse.refresh_token)
        setUser()
        startRefreshTokenTimer()
    }

    const refreshToken = async () => {
        const localTokens = getTokens()
        
        if (localTokens.refresh_token) {
            tokens.value = localTokens as AuthTokens
            const isRefTokenExp = isRefreshTokenExpired()
            if (isRefTokenExp) {
                console.log('Refresh token expired')
                logout()
                return
            }
        } else {
            console.log('No token found')
            logout()
            return
        }

        const tokenResponse = await refresh({ refresh_token: tokens.value?.refresh_token! })
        tokens.value = tokenResponse
        localStorage.setItem('token', tokens.value.token)
        localStorage.setItem('refresh_token', tokens.value.refresh_token)
        

        if (user.value === null) {
            setUser()
        }

        startRefreshTokenTimer()
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        tokens.value = null
        user.value = null
        stopRefreshTokenTimer()
        router.push('/login')
    }

    const isRefreshTokenExpired = () => {
        if (tokens.value === null) {
            return true
        }

        const decodedToken = jwtDecode(tokens.value.refresh_token)
        return decodedToken.exp! * 1000 < Date.now()
    }

    const startRefreshTokenTimer = () => {
        const decodedToken = jwtDecode(tokens.value?.token!)
        const expires = new Date(decodedToken.exp! * 1000)
        const timeout = expires.getTime() - Date.now() - (60 * 1000)

        refreshTokenTimeout.value = setTimeout(refreshToken, timeout)
    }

    const stopRefreshTokenTimer = () => {
        clearTimeout(refreshTokenTimeout.value!)
    }

    const setUser = () => {
        if (user.value === null) {
            getUserInfo().then((userInfo) => {
                user.value = userInfo
            }).catch((err) => {
                console.error(err)
            })
        }
    }

    return {
        login,
        refreshToken,
        logout,
        tokens,
        user
    }
})