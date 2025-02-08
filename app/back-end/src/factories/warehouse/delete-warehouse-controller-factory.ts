import { controllerAdapter } from 'vkrun'
import prisma from '../../libs/prisma'
import { WarehousePrismaRepository } from '../../repositories/prisma/warehouse-repository-prisma'
import { DeleteWarehouseService } from '../../services/warehouse/delete-warehouse-service'
import { DeleteWarehouseController } from '../../controllers/warehouse/delete-warehouse-controller'

export const deleteWarehouseControllerFactory = () => {
  const repository = new WarehousePrismaRepository(prisma.warehouse)
  const service = new DeleteWarehouseService(repository)

  const controller = new DeleteWarehouseController(service)
  return controllerAdapter(controller)
}
