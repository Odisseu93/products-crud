import { WarehouseEntity } from '../../../entities/warehouse-entity'

export interface CreateWarehouseServiceInput {
  name: string
  location: string
}

export type CreateWarehouseServiceOutput = {
  statusCode: number
  content: WarehouseEntity | { message: string }
}

export interface CreateWarehouseServiceInterface {
  execute: (
    input: CreateWarehouseServiceInput
  ) => Promise<CreateWarehouseServiceOutput>
}
