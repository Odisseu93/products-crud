import { ProductEntity } from '../../../entities/product-entity'

export interface OutputGetAllProductsService {
  statusCode: number
  content: ProductEntity[] | { message: string }
}

export interface GetAllProductsServiceInterface {
  execute: () => Promise<OutputGetAllProductsService>
}
