import { CreateProductController } from '../../controllers/product/create-product-contoller'
import { ProductRepositoryPrisma } from '../../repositories/prisma/product-repository-prisma'
import { CreateProductService } from '../../services/product/create-product-service'
import { controllerAdapter } from 'vkrun'

export const createProductControllerFactory = () => {
  const repository = new ProductRepositoryPrisma()
  const service = new CreateProductService(repository)

  const controller = new CreateProductController(service)
  return controllerAdapter(controller)
}
