export enum Categoria {
    BEBIDA = "Bebida",
    ENTRADA = "Entrada",
    SOBREMESA = "Sobremesa",
    PRATO_PRINCIPAL = "Prato Principal",
}

export interface Produto {
    id: string
    nome: string
    preco: number
    categoria: Categoria
    created_at: string
    updated_at: string
}

export interface CreateProduto {
    nome: string
    preco: number
    categoria: Categoria
}

export interface UpdateProduto {
    nome: string
    preco: number
    categoria: Categoria
}