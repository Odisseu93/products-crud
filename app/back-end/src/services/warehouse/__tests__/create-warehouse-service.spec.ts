import { WarehousePrismaRepository } from '../../../repositories/prisma/warehouse-repository-prisma'
import { CreateWarehouseServiceInput } from '../../../interfaces/services/warehouse/create-warehouse-service-interface'
import { CreateWarehouseService } from '../create-warehouse-service'

import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import prisma from '../../../libs/prisma'

jest.mock('../../../libs/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

describe('CreateWarehouseService', () => {


  it('Should create a new warehouse', async () => {
    const repository = new WarehousePrismaRepository(prismaMock.warehouse)
    const service = new CreateWarehouseService(repository)

    const warehouse: CreateWarehouseServiceInput = {
      name: 'Test Warehouse',
      location: 'Test Location',
    }

    prismaMock.warehouse.create.mockResolvedValue({
      id: 'warehouse-id',
      name: 'Test Warehouse',
      location: 'Test Location',
    })

    const sut = (await await service.execute(warehouse)).content

    expect(sut).toHaveProperty('id')
    expect(sut).toHaveProperty('name', 'Test Warehouse')
    expect(sut).toHaveProperty('location', 'Test Location')
  })
})
