import { ProductType } from '../../../types/product-type'

export interface ProductRepositoryInterface {
  create: (product: ProductType) => Promise<ProductType>
  update: (product: ProductType) => Promise<void>
  delete: (productId: string) => Promise<void>
  get: (productId: string) => Promise<ProductType>
}
