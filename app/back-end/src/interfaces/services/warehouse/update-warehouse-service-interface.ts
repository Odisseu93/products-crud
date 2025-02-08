import { WarehouseEntity } from '../../../entities/warehouse-entity'

export interface UpdateWarehouseServiceInput {
  id: string
  name: string
  location: string
}

export type UpdateWarehouseServiceOutput = {
  statusCode: number
  content: WarehouseEntity | { message: string }
}

export interface UpdateWarehouseServiceInterface {
  execute: (
    input: UpdateWarehouseServiceInput
  ) => Promise<UpdateWarehouseServiceOutput>
}
