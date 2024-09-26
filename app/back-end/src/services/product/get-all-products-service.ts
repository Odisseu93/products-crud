import { ProductRepositoryInterface } from '../../interfaces/repositories/product/product-repository-interface'
import {
  OutputGetAllProductsService,
  GetAllProductsServiceInterface,
} from '../../interfaces/services/product/get-all-products-interface'

export class GetAllProductsService implements GetAllProductsServiceInterface {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  public async execute(): Promise<OutputGetAllProductsService> {
    try {
      const products = await this.productRepository.getAll()
      return {
        statusCode: 201,
        content: products,
      }
    } catch (error: any) {
      return {
        statusCode: 503,
        content: {
          message: `Error creating product: ${error.message}`,
        },
      }
    }
  }
}
