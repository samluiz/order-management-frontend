import { client } from "./client"


export async function getUserInfo() {
    return client.get(`/usuarios/me`, undefined, true)
}