import { WarehousePrismaRepository } from '../../../repositories/prisma/warehouse-repository-prisma'
import { CreateWarehouseServiceInput } from '../../../interfaces/services/warehouse/create-warehouse-service-interface'
import { DeleteWarehouseService } from '../delete-warehouse-service'
import { CreateWarehouseService } from '../create-warehouse-service'
import { GetWarehouseService } from '../get-warehouse-service'

import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import prisma from '../../../libs/prisma'

jest.mock('../../../libs/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
describe('GetWarehouseService', () => {
  it('Should find a warehouse', async () => {
    const repository = new WarehousePrismaRepository(prismaMock.warehouse)
    const createWarehouseService = new CreateWarehouseService(repository)
    const getWarehouseService = new GetWarehouseService(repository)

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
      prismaMock.warehouse.findUnique.mockResolvedValue({
        id,
        name: 'Test Warehouse',
        location: 'Test Location',
      })
    }

    const sut = await (await getWarehouseService.execute({ id })).content

    expect(sut).toHaveProperty('id')
    expect(sut).toHaveProperty('name', 'Test Warehouse')
    expect(sut).toHaveProperty('location', 'Test Location')
  })
})
