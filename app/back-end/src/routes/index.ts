import { createProductSchema } from '../utils/schemas'
import { Router, validateRouteData } from 'vkrun'
import { createProductControllerFactory } from '../factories/product/create-product-controller-factory'

const router = Router()

router.post(
  '/product/create',
  validateRouteData(createProductSchema),
  createProductControllerFactory()
)

export { router }
