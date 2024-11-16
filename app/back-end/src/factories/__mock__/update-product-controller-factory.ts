import { UpdateProductController } from '../../controllers/product/update-product-contoller'
import { ProductRepositorySqlite } from '../../repositories/sqlite/__mock__/products-repository-sqlite'
import { UpdateProductService } from '../../services/product/update-product-service'
import { controllerAdapter } from 'vkrun'

export const updateProductControllerFactory = () => {
  const repository = new ProductRepositorySqlite()
  const service = new UpdateProductService(repository)

  const controller = new UpdateProductController(service)
  return controllerAdapter(controller)
}
