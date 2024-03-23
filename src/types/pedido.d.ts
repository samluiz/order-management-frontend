import type { Produto } from "./produto"

export interface ItemPedido {
    id: string
    produto: Produto
    quantidade: number
    sub_total: number
    created_at: string
    updated_at: string
}

export interface Pedido {
    id: string
    itens: ItemPedido[]
    total: number
    created_at: string
    updated_at: string
}

export interface CreateItemPedido {
    produto: string
    quantidade: number
}

export interface CreatePedido {
    itens: CreateItemPedido[]
}