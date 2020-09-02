

export interface CreateProductDTO {
    title: string;
    description: string;
    price: number
}

export interface UpdateProductDTO {
    title?: string;
    description?: string;
    price?: number
}
