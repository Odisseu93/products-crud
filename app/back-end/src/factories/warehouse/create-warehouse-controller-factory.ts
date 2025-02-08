import { CreateWarehouseController } from '../../controllers/warehouse/create-warehouse-controller'
import prisma from '../../libs/prisma'
import { WarehousePrismaRepository } from '../../repositories/prisma/warehouse-repository-prisma'
import { CreateWarehouseService } from '../../services/warehouse/create-warehouse-service'
import { controllerAdapter } from 'vkrun'

export const createWarehouseControllerFactory = () => {
  const repository = new WarehousePrismaRepository(prisma.warehouse)
  const service = new CreateWarehouseService(repository)

  const controller = new CreateWarehouseController(service)
  return controllerAdapter(controller)
}
