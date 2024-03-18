import { useAuthStore } from "@/stores/auth.store"

export const client = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
}

function request(method: string) {
    return (url: string, body?: any, token?: string) => {
        const options: any = {
            method,
            headers: authHeader(url),
        }
        if (body) {
            options['body'] = JSON.stringify(body)
            options.headers['Content-Type'] = 'application/json'
        }
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`
        }
        return fetch(url, options).then(handleResponse)
    }
}

function authHeader(url: string) {
    const { user, tokens } = useAuthStore()
    const isLoggedIn = !!user
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_BASE_URL)
    if (isLoggedIn && isApiUrl) {
        return { 'Authorization': `Bearer ${tokens?.token}` }
    } else {
        return {}
    }
}

function handleResponse(response: Response) {
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