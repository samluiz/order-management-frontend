import { useAuthStore } from "@/stores/auth.store"
import { client } from "./client"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getUserInfo() {
    const token = useAuthStore().tokens?.token

    return client.get(`${BASE_URL}/usuarios/me`, undefined, token)
}