import { ProductEntity } from '../../../entities/product-entity'
import { ProductType } from '../../../types/product-type'

export interface ProductRepositoryInterface {
  create: (product: ProductType) => Promise<ProductEntity>
  update: (product: ProductType) => Promise<ProductEntity>
  delete: (id: string) => Promise<ProductEntity>
  get: (id: string) => Promise<ProductEntity>
  getAll: () => Promise<ProductEntity[]>
}
