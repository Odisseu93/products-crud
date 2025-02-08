import { createWarehouseControllerFactory } from '../../factories/warehouse/create-warehouse-controller-factory'
import { deleteWarehouseControllerFactory } from '../../factories/warehouse/delete-warehouse-controller-factory'
import { getAllWarehousesControllerFactory } from '../../factories/warehouse/get-all-warehouses-controller-factory'
import { getWarehouseControllerFactory } from '../../factories/warehouse/get-warehouse-controller-factory'
import { updateWarehouseControllerFactory } from '../../factories/warehouse/udpate-warehouse-controller-factory'
import { validateRouteData } from '../../middlewares/validateRouteData'
import {
  createWarehouseSchema,
  updateWarehouseSchema,
  warehouseIdSchema,
} from '../../utils/schemas/controllers/warehouse-controller-schemas'
import { Router } from 'vkrun'

const router = Router()

router.post(
  '/warehouse/create',
  validateRouteData(createWarehouseSchema),
  createWarehouseControllerFactory()
)
router.put(
  '/warehouse/update/:id',
  validateRouteData(updateWarehouseSchema),
  updateWarehouseControllerFactory()
)
router.get('/warehouse/get/all', getAllWarehousesControllerFactory())
router.get(
  '/warehouse/get/:id',
  validateRouteData(warehouseIdSchema),
  getWarehouseControllerFactory()
)
router.delete('/warehouse/delete/:id', deleteWarehouseControllerFactory())

export default router
