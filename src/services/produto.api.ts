import type { CreateProduto, Produto, UpdateProduto } from "@/types/produto";
import { client } from "./client";
import type { PaginatedResponse } from "@/types/common";

export async function getProdutos(): Promise<PaginatedResponse<Produto>> {
    return client.get(`/produtos`, undefined, true)
}

export async function getProdutoById(id: string): Promise<Produto> {
    return client.get(`/produtos/${id}`, undefined, true)
}

export async function createProduto(produto: CreateProduto): Promise<Produto> {
    return client.post(`/produtos`, produto, true)
}

export async function updateProduto(id: string, produto: UpdateProduto): Promise<Produto> {
    return client.put(`/produtos/${id}`, produto, true)
}

export async function deleteProduto(id: string): Promise<void> {
    return client.delete(`/produtos/${id}`, undefined, true)
}