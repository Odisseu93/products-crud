import { ProductRepositoryPrisma } from '../../repositories/prisma/product-repository-prisma'
import { DeleteProductController } from '../../controllers/product/delete-product-contoller'
import { DeleteProductService } from '../../services/product/delete-product-service'
import { controllerAdapter } from 'vkrun'

export const deleteProductControllerFactory = () => {
  const repository = new ProductRepositoryPrisma()
  const service = new DeleteProductService(repository)

  const controller = new DeleteProductController(service)
  return controllerAdapter(controller)
}
