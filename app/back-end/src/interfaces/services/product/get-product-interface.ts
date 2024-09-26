import { ProductEntity } from '../../../entities/product-entity'

export interface InputGetProductService { id: string }

export interface OutputGetProductService {
  statusCode: number
  content: ProductEntity | { message: string }
}

export interface GetProductServiceInterface {
  execute: (
    input: InputGetProductService
  ) => Promise<OutputGetProductService>
}
