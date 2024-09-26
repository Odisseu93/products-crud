import { ProductRepositoryInterface } from '../../interfaces/repositories/product/product-repository-interface'
import {
  UpdateProductServiceInterface,
  InputUpdateProductService,
  OutputUpdateProductService,
} from '../../interfaces/services/product/update-product-interface'

export class UpdateProductService implements UpdateProductServiceInterface {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  public async execute(
    input: InputUpdateProductService
  ): Promise<OutputUpdateProductService> {
    try {
      const updatedProduct = await this.productRepository.update(input)

      if (!updatedProduct) {
        return {
          statusCode: 404,
          content: {
            message: 'Product not found',
          },
        }
      }
      return {
        statusCode: 200,
        content: updatedProduct,
      }
    } catch (error: any) {
      return {
        statusCode: 503,
        content: {
          message: `Error updating product: ${error.message}`,
        },
      }
    }
  }
}
