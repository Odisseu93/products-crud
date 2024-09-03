import { ProductEntity } from '../../../entities/product-entity'

export interface InputCreateProductService {
  name: string
  price: number
}

export interface OutputCreateProductService {
  statusCode: number
  content: ProductEntity | { message: string }
}

export interface CreateProductServiceInterface {
  execute: (
    input: InputCreateProductService
  ) => Promise<OutputCreateProductService>
}
