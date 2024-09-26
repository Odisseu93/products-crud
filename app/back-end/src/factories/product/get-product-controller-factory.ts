import { GetProductController } from '../../controllers/product/get-product-contoller'
import { ProductRepositorySqlite } from '../../repositories/sqlite/products-repository-sqlite'
import { GetProductService } from '../../services/product/get-product-service'
import { controllerAdapter } from 'vkrun'

export const getProductControllerFactory = () => {
  const repository = new ProductRepositorySqlite()
  const service = new GetProductService(repository)

  const controller = new GetProductController(service)
  return controllerAdapter(controller)
}
