import { ProductRepositoryInterface } from '../../interfaces/repositories/product/product-repository-interface'
import {
  InputDeleteProductService,
  OutputDeleteProductService,
  DeleteProductServiceInterface,
} from '../../interfaces/services/product/delete-product-interface'

export class DeleteProductService implements DeleteProductServiceInterface {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  public async execute(
    input: InputDeleteProductService
  ): Promise<OutputDeleteProductService> {
    try {
      const deletedProduct = await this.productRepository.delete(input.id)

      if (!deletedProduct) {
        return {
          statusCode: 404,
          content: {
            message: 'Product not found',
          },
        }
      }
      return {
        statusCode: 201,
        content: deletedProduct,
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
