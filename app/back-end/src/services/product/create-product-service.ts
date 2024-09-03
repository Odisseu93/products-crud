import v from 'vkrun'

import { ProductRepositoryInterface } from '../../interfaces/repositories/product/product-repository-interface'
import {
  CreateProductServiceInterface,
  InputCreateProductService,
  OutputCreateProductService,
} from '../../interfaces/services/product/create-product-interface'

export class CreateProductService implements CreateProductServiceInterface {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  public async execute(
    input: InputCreateProductService
  ): Promise<OutputCreateProductService> {
    const id = v.randomUUID()

    try {
      const createdProduct = await this.productRepository.create({
        ...input,
        id,
      })
      return {
        statusCode: 201,
        content: createdProduct,
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
