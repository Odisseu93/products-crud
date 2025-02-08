import { GetAllWarehousesService } from '../../services/warehouse/get-all-warehouses-service'
import { GetAllWarehousesController } from '../../controllers/warehouse/get-all-warehousee-controller'
import prisma from '../../libs/prisma'
import { WarehousePrismaRepository } from '../../repositories/prisma/warehouse-repository-prisma'
import { controllerAdapter } from 'vkrun'

export const getAllWarehousesControllerFactory = () => {
  const repository = new WarehousePrismaRepository(prisma.warehouse)
  const service = new GetAllWarehousesService(repository)

  const controller = new GetAllWarehousesController(service)
  return controllerAdapter(controller)
}
