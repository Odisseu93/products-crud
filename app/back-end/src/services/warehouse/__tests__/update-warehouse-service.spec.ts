import { WarehousePrismaRepository } from '../../../repositories/prisma/warehouse-repository-prisma'
import { CreateWarehouseServiceInput } from '../../../interfaces/services/warehouse/create-warehouse-service-interface'
import { CreateWarehouseService } from '../create-warehouse-service'
import { UpdateWarehouseService } from '../update-warehouse-service'

import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import prisma from '../../../libs/prisma'

jest.mock('../../../libs/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
describe('UpdateWarehouseService', () => {
  it('Should update a warehouse', async () => {
    const repository = new WarehousePrismaRepository(prismaMock.warehouse)
    const createWarehouseService = new CreateWarehouseService(repository)
    const updateWarehouseService = new UpdateWarehouseService(repository)

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
      prismaMock.warehouse.update.mockResolvedValue({
        id,
        name: 'Test Warehouse 2',
        location: 'Test Location 2',
      })
    }

    const sut = (
      await updateWarehouseService.execute({
        id,
        name: 'Test Warehouse 2',
        location: 'Test Location 2',
      })
    )['content']

    expect(sut).toHaveProperty('id')
    expect(sut).toHaveProperty('name', 'Test Warehouse 2')
    expect(sut).toHaveProperty('location', 'Test Location 2')
  })
})
