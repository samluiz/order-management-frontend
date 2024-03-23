import type { PaginatedResponse } from "@/types/common";
import { client } from "./client";
import type { CreateItemPedido, CreatePedido, Pedido } from "@/types/pedido";

export async function getPedidos(): Promise<PaginatedResponse<Pedido>> {
    return client.get(`/pedidos`, undefined, true)
}

export async function getPedidoById(id: string): Promise<Pedido> {
    return client.get(`/pedidos/${id}`, undefined, true)
}

export async function createPedido(pedido: CreatePedido): Promise<Pedido> {
    return client.post(`/pedidos`, pedido, true)
}

export async function addItemToPedido(idPedido: string, item: CreateItemPedido): Promise<Pedido> {
    return client.post(`/pedidos/${idPedido}/item`, item, true)
}

export async function increaseProductQuantityFromItem(itemId: string, quantity: number): Promise<Pedido> {
    return client.put(`/pedidos/item/${itemId}/aumentar?${quantity}`, undefined, true)
}

export async function decreaseProductQuantityFromItem(itemId: string, quantity: number): Promise<Pedido> {
    return client.put(`/pedidos/item/${itemId}/diminuir?${quantity}`, undefined, true)
}

export async function deleteItemFromPedido(idPedido: string, idItem: string): Promise<Pedido> {
    return client.delete(`/pedidos/${idPedido}/item/${idItem}`, undefined, true)
}

export async function deletePedido(id: string): Promise<void> {
    return client.delete(`/pedidos/${id}`, undefined, true)
}