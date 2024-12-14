import { UpdateProductController } from '../../controllers/product/update-product-contoller'
import { ProductRepositoryPrisma } from '../../repositories/prisma/product-repository-prisma'
import { UpdateProductService } from '../../services/product/update-product-service'
import { controllerAdapter } from 'vkrun'

export const updateProductControllerFactory = () => {
  const repository = new ProductRepositoryPrisma()
  const service = new UpdateProductService(repository)

  const controller = new UpdateProductController(service)
  return controllerAdapter(controller)
}
