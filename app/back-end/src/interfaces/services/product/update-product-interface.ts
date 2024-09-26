import { ProductEntity } from '../../../entities/product-entity'

export interface InputUpdateProductService {
    id: string
    name: string
    price: number
}

export interface OutputUpdateProductService {
    statusCode: number
    content: ProductEntity | { message: string }
}

export interface UpdateProductServiceInterface {
    execute: (
        input: InputUpdateProductService
    ) => Promise<OutputUpdateProductService>
}
