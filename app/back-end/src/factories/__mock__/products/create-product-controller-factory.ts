import { CreateProductController } from '../../../controllers/product/create-product-contoller'
import { ProductRepositorySqlite } from '../../../repositories/sqlite/__mock__/products-repository-sqlite'
import { CreateProductService } from '../../../services/product/create-product-service'
import { controllerAdapter } from 'vkrun'

export const createProductControllerFactory = () => {
  const repository = new ProductRepositorySqlite()
  const service = new CreateProductService(repository)

  const controller = new CreateProductController(service)
  return controllerAdapter(controller)
}
