import { ProductRepositoryInterface } from '../../interfaces/repositories/product/product-repository-interface'
import {
  InputGetProductService,
  OutputGetProductService,
  GetProductServiceInterface,
} from '../../interfaces/services/product/get-product-interface'

export class GetProductService implements GetProductServiceInterface {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  public async execute(
    input: InputGetProductService
  ): Promise<OutputGetProductService> {
    try {
      const product = await this.productRepository.get(input.id)

      if (!product) {
        return {
          statusCode: 404,
          content: {
            message: 'Product not found',
          },
        }
      }
      return {
        statusCode: 200,
        content: product,
      }
    } catch (error: any) {
      return {
        statusCode: 503,
        content: {
          message: `Error get product: ${error.message}`,
        },
      }
    }
  }
}
