import { ProductEntity } from '../../../entities/product-entity'

export interface InputDeleteProductService { id: string }

export interface OutputDeleteProductService {
  statusCode: number
  content: ProductEntity | { message: string }
}

export interface DeleteProductServiceInterface {
  execute: (
    input: InputDeleteProductService
  ) => Promise<OutputDeleteProductService>
}
