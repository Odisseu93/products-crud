import { WarehousePrismaRepository } from '../../../repositories/prisma/warehouse-repository-prisma'
import { CreateWarehouseServiceInput } from '../../../interfaces/services/warehouse/create-warehouse-service-interface'
import { DeleteWarehouseService } from '../delete-warehouse-service'
import { CreateWarehouseService } from '../create-warehouse-service'

import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import prisma from '../../../libs/prisma'

jest.mock('../../../libs/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
describe('DeleteWarehouseService', () => {
  it('Should delete a warehouse', async () => {
    const repository = new WarehousePrismaRepository(prismaMock.warehouse)
    const createWarehouseService = new CreateWarehouseService(repository)
    const deleteWarehouseService = new DeleteWarehouseService(repository)

    const warehouse: CreateWarehouseServiceInput = {
      name: 'Test Warehouse',
      location: 'Test Location',
    }

    prismaMock.warehouse.create.mockResolvedValue({
      id: 'warehouse-id',
      name: 'Test Warehouse',
      location: 'Test Location',
    })

    const createdWarehouse = (await createWarehouseService.execute(warehouse))
      .content
    const hasData = 'message' in createdWarehouse
    let id = ''

    if (!hasData) {
      id = createdWarehouse.id
      prismaMock.warehouse.delete.mockResolvedValue({
        id,
        name: 'Test Warehouse',
        location: 'Test Location',
      })
    }

    const sut = await (
      await deleteWarehouseService.execute({
        id,
      })
    ).content

    expect(sut).toHaveProperty('id')
    expect(sut).toHaveProperty('name', 'Test Warehouse')
    expect(sut).toHaveProperty('location', 'Test Location')
  })
})
