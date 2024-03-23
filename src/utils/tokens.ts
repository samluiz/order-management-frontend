export function getTokens() {
    const token = localStorage.getItem('token')
    const refresh_token = localStorage.getItem('refresh_token')
    
    return {
        token,
        refresh_token,
    }
}