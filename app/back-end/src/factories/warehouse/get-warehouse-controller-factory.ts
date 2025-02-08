import { GetWarehouseService } from '../../services/warehouse/get-warehouse-service'
import { GetWarehouseController } from '../../controllers/warehouse/get-warehouse-controller copy'
import prisma from '../../libs/prisma'
import { WarehousePrismaRepository } from '../../repositories/prisma/warehouse-repository-prisma'
import { controllerAdapter } from 'vkrun'

export const getWarehouseControllerFactory = () => {
  const repository = new WarehousePrismaRepository(prisma.warehouse)
  const service = new GetWarehouseService(repository)

  const controller = new GetWarehouseController(service)
  return controllerAdapter(controller)
}
