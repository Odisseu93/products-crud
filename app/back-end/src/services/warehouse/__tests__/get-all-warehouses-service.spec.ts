import { WarehousePrismaRepository } from '../../../repositories/prisma/warehouse-repository-prisma'
import { CreateWarehouseServiceInput } from '../../../interfaces/services/warehouse/create-warehouse-service-interface'
import { CreateWarehouseService } from '../create-warehouse-service'
import { GetAllWarehousesService } from '../get-all-warehouses-service'

import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import prisma from '../../../libs/prisma'

jest.mock('../../../libs/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

describe('GetAllWarehousesService', () => {
  it('Should get all warehouses', async () => {
    const repository = new WarehousePrismaRepository(prismaMock.warehouse)
    const createWarehouseService = new CreateWarehouseService(repository)
    const getAllWarehousesService = new GetAllWarehousesService(repository)

    const warehouse1: CreateWarehouseServiceInput = {
      name: 'Test Warehouse',
      location: 'Test Location',
    }

    const warehouse2: CreateWarehouseServiceInput = {
      name: 'Test Warehouse 2',
      location: 'Test Location',
    }

    const warehouse3: CreateWarehouseServiceInput = {
      name: 'Test Warehouse 3',
      location: 'Test Location 45',
    }

    const warehouses = Array.from([warehouse1, warehouse2, warehouse3]).map(
      (w, i) => ({ id: String(i), ...w })
    )

    prismaMock.warehouse.findMany.mockResolvedValue(warehouses)

    const sut = await (await getAllWarehousesService.execute()).content

    expect(sut).toHaveProperty('length', 3)
    expect(sut).toEqual(expect.arrayContaining(warehouses))
  })
})
