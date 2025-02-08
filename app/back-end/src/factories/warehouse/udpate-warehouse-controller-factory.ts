import { WarehousePrismaRepository } from '../../repositories/prisma/warehouse-repository-prisma'
import { controllerAdapter } from 'vkrun'
import prisma from '../../libs/prisma'
import { UpdateWarehouseService } from '../../services/warehouse/update-warehouse-service'
import { UpdateWarehouseController } from '../../controllers/warehouse/update-warehouse-controller'

export const updateWarehouseControllerFactory = () => {
  const repository = new WarehousePrismaRepository(prisma.warehouse)
  const service = new UpdateWarehouseService(repository)

  const controller = new UpdateWarehouseController(service)
  return controllerAdapter(controller)
}
