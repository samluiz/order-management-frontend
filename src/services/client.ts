import { useAuthStore } from "@/stores/auth.store"
import type { PaginatedResponse } from "@/types/common"

export const client = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL

function request(method: string) {
    return (path: string, body?: any, isAuthRequired?: boolean) => {
        const options: any = {
            method,
            headers: authHeader(),
        }
        if (body) {
            options['body'] = JSON.stringify(body)
            options.headers['Content-Type'] = 'application/json'
        }
        if (isAuthRequired) {
            const token = useAuthStore().tokens?.token
            options.headers['Authorization'] = `Bearer ${token}`
        }
        return fetch(`${BASE_URL}${path}`, options).then(handleResponse)
    }
}

function authHeader() {
    const { user, tokens } = useAuthStore()
    const isLoggedIn = !!user
    if (isLoggedIn) {
        return { 'Authorization': `Bearer ${tokens?.token}` }
    } else {
        return {}
    }
}

function handleResponse(response: Response): any | PaginatedResponse<any> {
    return response.text().then(text => {
        const data = text && JSON.parse(text)

        if (!response.ok) {
            const { user, logout } = useAuthStore()

            if ([401, 403].includes(response.status) && user) {
                logout()
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        return data
    })
}