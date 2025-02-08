import { WarehouseRepositoryInterface } from '../../interfaces/repositories/warehouse/warehouse-repository-interface'
import {
  GetWarehouseServiceInterface,
  GetWarehouseServiceInput,
  GetWarehouseServiceOutput,
} from '../../interfaces/services/warehouse/get-warehouse-service-interface'

export class GetWarehouseService implements GetWarehouseServiceInterface {
  private warehouseRepository: WarehouseRepositoryInterface

  constructor(warehouseRepository: WarehouseRepositoryInterface) {
    this.warehouseRepository = warehouseRepository
  }

  public async execute(
    input: GetWarehouseServiceInput
  ): Promise<GetWarehouseServiceOutput> {
    try {
      const warehouse = await this.warehouseRepository.get(input.id)
      if (!warehouse) {
        return {
          statusCode: 404,
          content: {
            message: 'Warehouse not found',
          },
        }
      }

      return {
        statusCode: 200,
        content: warehouse,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          statusCode: 503,
          content: {
            message: `Error geting warehouse: ${error.message}`,
          },
        }
      }

      return {
        statusCode: 500,
        content: {
          message:
            ' An unexpected error occurred while getting the warehouse. Please try again later.',
        },
      }
    }
  }
}
