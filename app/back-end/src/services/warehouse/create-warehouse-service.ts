import v from 'vkrun'

import { WarehouseRepositoryInterface } from '../../interfaces/repositories/warehouse/warehouse-repository-interface'
import {
  CreateWarehouseServiceInterface,
  CreateWarehouseServiceInput,
  CreateWarehouseServiceOutput,
} from '../../interfaces/services/warehouse/create-warehouse-service-interface'

export class CreateWarehouseService implements CreateWarehouseServiceInterface {
  private warehouseRepository: WarehouseRepositoryInterface

  constructor(warehouseRepository: WarehouseRepositoryInterface) {
    this.warehouseRepository = warehouseRepository
  }

  public async execute(
    input: CreateWarehouseServiceInput
  ): Promise<CreateWarehouseServiceOutput> {
    try {
      const createdWharehouse = await this.warehouseRepository.create({
        ...input,
      })
      return {
        statusCode: 201,
        content: createdWharehouse,
      }
    } catch (error: any) {
      return {
        statusCode: 503,
        content: {
          message: `Error creating product: ${error.message}`,
        },
      }
    }
  }
}
