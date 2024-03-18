export function getTokens() {
    const token = localStorage.getItem('token')
    const refresh_token = localStorage.getItem('refresh_token')
    if (!token || !refresh_token) {
        throw new Error('No token or refresh token found')
    }
    return {
        token,
        refresh_token,
    }
}