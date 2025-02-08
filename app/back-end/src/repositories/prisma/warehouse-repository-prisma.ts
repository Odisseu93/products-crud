import { idGenerator } from '../../utils/idGenerator'

import { WarehouseEntity } from '../../entities/warehouse-entity'
import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

type WarehouseRepositoryType = Prisma.WarehouseDelegate<DefaultArgs>
export class WarehousePrismaRepository {
  private warehouseRepository: WarehouseRepositoryType

  constructor(warehouseRepository: WarehouseRepositoryType) {
    this.warehouseRepository = warehouseRepository
  }

  public async create({
    name,
    location,
  }: Omit<WarehouseEntity, 'id'>): Promise<WarehouseEntity> {
    const id = idGenerator('warehouse', 10).generate()

    console.log({ name, location })
    const createdWarehouse = await this.warehouseRepository.create({
      data: { id, name, location },
    })

    return createdWarehouse as WarehouseEntity
  }

  public async getAll(): Promise<WarehouseEntity[]> {
    const warehouses = await this.warehouseRepository.findMany()

    return warehouses as WarehouseEntity[]
  }

  public async update({ id, name, location }: WarehouseEntity) {
    const updatedWarehouse = await this.warehouseRepository.update({
      where: { id },
      data: { name, location },
    })

    return updatedWarehouse as WarehouseEntity
  }

  public async delete(warehouseId: string) {
    const warehouseDeleted = await this.warehouseRepository.delete({
      where: { id: warehouseId },
    })

    return warehouseDeleted as WarehouseEntity
  }

  public async get(warehouseId: string) {
    const selectedWarehouse = await this.warehouseRepository.findUnique({
      where: { id: warehouseId },
    })

    return selectedWarehouse as WarehouseEntity
  }
}
