import { WarehouseEntity } from '../../../entities/warehouse-entity'

export type GetAllWarehousesServiceOutput = {
  statusCode: number
  content: WarehouseEntity[] | { message: string }
}

export interface GetAllWarehousesServiceInterface {
  execute: () => Promise<GetAllWarehousesServiceOutput>
}
