import {
  createProductSchema,
  ProductIdSchema,
  updateProductSchema,
} from '../utils/schemas'
import { Router, validateRouteData } from 'vkrun'
import { createProductControllerFactory } from '../factories/product/create-product-controller-factory'
import { deleteProductControllerFactory } from '../factories/product/delete-product-controller-factory'
import { getAllProductsControllerFactory } from '../factories/product/get-all-products-controller-factory'
import { updateProductControllerFactory } from '../factories/product/update-product-controller-factory'
import { getProductControllerFactory } from '../factories/product/get-product-controller-factory'

const router = Router()

router.post(
  '/product/create',
  validateRouteData(createProductSchema),
  createProductControllerFactory()
)

router.delete(
  '/product/delete/:id',
  validateRouteData(ProductIdSchema),
  deleteProductControllerFactory()
)

router.get('/product/get/all', getAllProductsControllerFactory())

router.put(
  '/product/update/:id',
  validateRouteData(updateProductSchema),
  updateProductControllerFactory()
)

router.get(
  '/product/get/:id',
  validateRouteData(ProductIdSchema),
  getProductControllerFactory()
)

export { router }
