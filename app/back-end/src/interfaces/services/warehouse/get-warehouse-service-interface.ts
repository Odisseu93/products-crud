import { WarehouseEntity } from '../../../entities/warehouse-entity'

export interface GetWarehouseServiceInput {
  id: string
}

export type GetWarehouseServiceOutput = {
  statusCode: number
  content: WarehouseEntity | { message: string }
}

export interface GetWarehouseServiceInterface {
  execute: (
    input: GetWarehouseServiceInput
  ) => Promise<GetWarehouseServiceOutput>
}
