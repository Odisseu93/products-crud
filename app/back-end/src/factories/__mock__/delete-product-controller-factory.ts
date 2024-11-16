import { DeleteProductController } from '../../controllers/product/delete-product-contoller'
import { ProductRepositorySqlite } from '../../repositories/sqlite/__mock__/products-repository-sqlite'
import { DeleteProductService } from '../../services/product/delete-product-service'
import { controllerAdapter } from 'vkrun'

export const deleteProductControllerFactory = () => {
  const repository = new ProductRepositorySqlite()
  const service = new DeleteProductService(repository)

  const controller = new DeleteProductController(service)
  return controllerAdapter(controller)
}
