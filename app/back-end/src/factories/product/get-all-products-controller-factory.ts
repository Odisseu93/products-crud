import { GetAllProductsService } from '../../services/product/get-all-products-service'
import { ProductRepositoryPrisma } from '../../repositories/prisma/product-repository-prisma'
import { controllerAdapter } from 'vkrun'
import { GetAllProductsController } from '../../controllers/product/get-all-products-contoller'

export const getAllProductsControllerFactory = () => {
  const repository = new ProductRepositoryPrisma()
  const service = new GetAllProductsService(repository)

  const controller = new GetAllProductsController(service)
  const adpter = controllerAdapter(controller)
  return adpter
}
