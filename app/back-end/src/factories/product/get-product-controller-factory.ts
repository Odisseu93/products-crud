import { GetProductController } from '../../controllers/product/get-product-contoller'
import { ProductRepositoryPrisma } from '../../repositories/prisma/product-repository-prisma'
import { GetProductService } from '../../services/product/get-product-service'
import { controllerAdapter } from 'vkrun'

export const getProductControllerFactory = () => {
  const repository = new ProductRepositoryPrisma()
  const service = new GetProductService(repository)

  const controller = new GetProductController(service)
  return controllerAdapter(controller)
}
