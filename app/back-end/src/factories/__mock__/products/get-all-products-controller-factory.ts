import { GetAllProductsService } from '../../../services/product/get-all-products-service'
import { ProductRepositorySqlite } from '../../../repositories/sqlite/__mock__/products-repository-sqlite'
import { controllerAdapter } from 'vkrun'
import { GetAllProductsController } from '../../../controllers/product/get-all-products-contoller'

export const getAllProductsControllerFactory = () => {
  const repository = new ProductRepositorySqlite()
  const service = new GetAllProductsService(repository)

  const controller = new GetAllProductsController(service)
  const adpter = controllerAdapter(controller)
  return adpter
}
