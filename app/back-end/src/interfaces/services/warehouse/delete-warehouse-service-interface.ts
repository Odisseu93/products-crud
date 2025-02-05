import { WarehouseEntity } from '../../../entities/warehouse-entity'

export interface DeleteWarehouseServiceInput {
  id: string
}

export type DeleteWarehouseServiceOutput = {
  statusCode: number
  content: WarehouseEntity | { message: string }
}

export interface DeleteWarehouseServiceInterface {
  execute: (
    input: DeleteWarehouseServiceInput
  ) => Promise<DeleteWarehouseServiceOutput>
}
