import { WarehouseEntity } from '../../../entities/warehouse-entity'

export interface WarehouseRepositoryInterface {
  create: (warehouse: Omit<WarehouseEntity, 'id'>) => Promise<WarehouseEntity>
  update: (warehouse: WarehouseEntity) => Promise<WarehouseEntity>
  delete: (warehouseId: string) => Promise<WarehouseEntity>
  get: (warehouseId: string) => Promise<WarehouseEntity>
  getAll: () => Promise<WarehouseEntity[]>
}
