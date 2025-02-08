import v, { controllerAdapter } from 'vkrun'
import { app } from '../../__mock__/app'
import { validateRouteData } from '../../middlewares/validateRouteData'
import {
  createWarehouseSchema,
  warehouseIdSchema,
} from '../../utils/schemas/controllers/warehouse-controller-schemas'

import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import prisma from '../../libs/prisma'

import { CreateWarehouseController } from '../../controllers/warehouse/create-warehouse-controller'
import { DeleteWarehouseController } from '../../controllers/warehouse/delete-warehouse-controller'
import { GetAllWarehousesController } from '../../controllers/warehouse/get-all-warehousee-controller'
import { GetWarehouseController } from '../../controllers/warehouse/get-warehouse-controller copy'
import { UpdateWarehouseController } from '../../controllers/warehouse/update-warehouse-controller'
import { WarehousePrismaRepository } from '../../repositories/prisma/warehouse-repository-prisma'
import { CreateWarehouseService } from '../../services/warehouse/create-warehouse-service'
import { DeleteWarehouseService } from '../../services/warehouse/delete-warehouse-service'
import { GetAllWarehousesService } from '../../services/warehouse/get-all-warehouses-service'
import { GetWarehouseService } from '../../services/warehouse/get-warehouse-service'
import { UpdateWarehouseService } from '../../services/warehouse/update-warehouse-service'

const router = v.Router()

const createWarehouseURL = '/warehouse/create'
const getWarehouseURL = '/warehouse/get/:id'
const updateWarehouseURL = '/warehouse/update/:id'
const getAllWarehouseURL = '/warehouse/get/all'
const deleteWarehouseURL = '/warehouse/delete/:id'

jest.mock('../../libs/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

const createWarehouseControllerFactory = () => {
  const repository = new WarehousePrismaRepository(prismaMock.warehouse)
  const service = new CreateWarehouseService(repository)

  const controller = new CreateWarehouseController(service)
  return controllerAdapter(controller)
}

const updateWarehouseControllerFactory = () => {
  const repository = new WarehousePrismaRepository(prismaMock.warehouse)
  const service = new UpdateWarehouseService(repository)

  const controller = new UpdateWarehouseController(service)
  return controllerAdapter(controller)
}

const getWarehouseControllerFactory = () => {
  const repository = new WarehousePrismaRepository(prismaMock.warehouse)
  const service = new GetWarehouseService(repository)

  const controller = new GetWarehouseController(service)
  return controllerAdapter(controller)
}

const getAllWarehousesControllerFactory = () => {
  const repository = new WarehousePrismaRepository(prismaMock.warehouse)
  const service = new GetAllWarehousesService(repository)

  const controller = new GetAllWarehousesController(service)
  return controllerAdapter(controller)
}

const deleteWarehouseControllerFactory = () => {
  const repository = new WarehousePrismaRepository(prismaMock.warehouse)
  const service = new DeleteWarehouseService(repository)

  const controller = new DeleteWarehouseController(service)
  return controllerAdapter(controller)
}

router.post(
  createWarehouseURL,
  validateRouteData(createWarehouseSchema),
  createWarehouseControllerFactory()
)

router.get(getAllWarehouseURL, getAllWarehousesControllerFactory())

router.get(
  getWarehouseURL,
  validateRouteData(warehouseIdSchema),
  getWarehouseControllerFactory()
)

router.put(
  updateWarehouseURL,
  validateRouteData(warehouseIdSchema),
  updateWarehouseControllerFactory()
)

router.delete(
  deleteWarehouseURL,
  validateRouteData(warehouseIdSchema),
  deleteWarehouseControllerFactory()
)

app.use(router)

describe('warehouse.e2e', () => {
  it('should create a new warehouse', async () => {
    const body = {
      name: 'Warehouse 1',
      location: 'street 1',
    }

    prismaMock.warehouse.create.mockResolvedValue({ id: 'w1', ...body })

    const sut = await v.superRequest(app).post(createWarehouseURL, body)

    expect(sut.statusCode).toBe(201)
    expect(sut.data).toHaveProperty('id')
    expect(sut.data).toMatchObject(body)
  })

  it('should return an error when creating a warehouse with invalid data', async () => {
    const body = {
      name: '', // Invalid name
      location: 12,
    }

    // @ts-expect-error
    prismaMock.warehouse.create.mockResolvedValue({ id: '1', ...body })

    try {
      await v.superRequest(app).post(createWarehouseURL, body)
    } catch (error: any) {
      const { statusCode, data } = error.response

      expect(statusCode).toBe(400)
      expect(data).toHaveProperty('message', 'location must be a string type!')
    }
  })

  it('should get a warehouse by ID', async () => {
    prismaMock.warehouse.findUnique.mockResolvedValue({
      id: 'w1',
      name: 'Warehouse 1',
      location: 'street 1',
    })

    const sut = await v
      .superRequest(app)
      .get(getWarehouseURL.replace(':id', 'w1'))

    expect(sut.statusCode).toBe(200)
    expect(sut.data).toHaveProperty('id', 'w1')
    expect(sut.data).toHaveProperty('name', 'Warehouse 1')
    expect(sut.data).toHaveProperty('location', 'street 1')
  })

  it('should return an error when getting a non-existent warehouse', async () => {
    prismaMock.warehouse.findUnique.mockResolvedValue(null)

    try {
      await v.superRequest(app).get(getWarehouseURL.replace(':id', 'w1'))
    } catch (error: any) {
      const { statusCode, data } = error.response

      expect(statusCode).toBe(404)
      expect(data).toHaveProperty('message', 'Warehouse not found')
    }
  })

  // update warehouse
  it('should update a warehouse', async () => {
    const updatedBody = {
      name: 'Updated Warehouse 1',
      location: 'Updated street 1',
    }

    prismaMock.warehouse.update.mockResolvedValue({
      id: 'w1',
      name: 'Updated Warehouse 1',
      location: 'Updated street 1',
    })

    const sut = await v
      .superRequest(app)
      .put(updateWarehouseURL.replace(':id', 'w1'), updatedBody)

    expect(sut.statusCode).toBe(200)
    expect(sut.data).toHaveProperty('id', 'w1')
    expect(sut.data).toHaveProperty('name', 'Updated Warehouse 1')
    expect(sut.data).toHaveProperty('location', 'Updated street 1')
  })

  it('should return an error when updating a non-existent warehouse', async () => {
    // @ts-expect-error
    prismaMock.warehouse.update.mockResolvedValue(null)

    try {
      await v.superRequest(app).put(updateWarehouseURL.replace(':id', 'w1'), {})
    } catch (error: any) {
      const { statusCode, data } = error.response

      expect(statusCode).toBe(404)
      expect(data).toHaveProperty('message', 'Warehouse not found')
    }
  })

  it('should return a list of warehouses', async () => {
    const warehouses = [
      { id: 'w1', name: 'Warehouse 1', location: 'Street 1' },
      { id: 'w2', name: 'Warehouse 2', location: 'Street 2' },
    ]
    prismaMock.warehouse.findMany.mockResolvedValue(warehouses)

    const sut = await v.superRequest(app).get(getAllWarehouseURL)

    expect(sut.statusCode).toBe(200)
    expect(sut.data.warehouses.length).toEqual(2)
    expect(sut.data.warehouses.sort()).toEqual(warehouses.sort())
  })

  it('should return an empty array when getting all warehouses', async () => {
    prismaMock.warehouse.findMany.mockResolvedValue([])

    const sut = await v.superRequest(app).get(getAllWarehouseURL)

    expect(sut.statusCode).toBe(200)
    expect(sut.data.warehouses.length).toEqual(0)
  })

  it('should delete a warehouse', async () => {
    prismaMock.warehouse.delete.mockResolvedValue({
      id: 'w1',
      name: 'Warehouse 1',
      location: 'Street 1',
    })

    const sut = await v
      .superRequest(app)
      .delete(deleteWarehouseURL.replace(':id', 'w1'))

    expect(sut.statusCode).toBe(200)
    expect(sut.data).toHaveProperty('id', 'w1')
    expect(sut.data).toHaveProperty('name', 'Warehouse 1')
    expect(sut.data).toHaveProperty('location', 'Street 1')
  })

  it('should return an error when deleting a non-existent warehouse', async () => {
    // @ts-expect-error
    prismaMock.warehouse.delete.mockResolvedValue(null)

    try {
      await v.superRequest(app).delete(deleteWarehouseURL.replace(':id', 'w1'))
    } catch (error: any) {
      const { statusCode, data } = error.response

      expect(statusCode).toBe(404)
      expect(data).toHaveProperty('message', 'Warehouse not found')
    }
  })
})
