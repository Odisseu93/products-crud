import { WarehouseRepositoryInterface } from '../../interfaces/repositories/warehouse/warehouse-repository-interface'
import {
  UpdateWarehouseServiceInterface,
  UpdateWarehouseServiceInput,
  UpdateWarehouseServiceOutput,
} from '../../interfaces/services/warehouse/update-warehouse-service-interface'

export class UpdateWarehouseService implements UpdateWarehouseServiceInterface {
  private warehouseRepository: WarehouseRepositoryInterface

  constructor(warehouseRepository: WarehouseRepositoryInterface) {
    this.warehouseRepository = warehouseRepository
  }

  public async execute(
    input: UpdateWarehouseServiceInput
  ): Promise<UpdateWarehouseServiceOutput> {
    try {
      const updatedWarehouse = await this.warehouseRepository.update(input)
      if (!updatedWarehouse) {
        return {
          statusCode: 404,
          content: {
            message: 'Warehouse not found',
          },
        }
      }
      return {
        statusCode: 200,
        content: updatedWarehouse,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          statusCode: 503,
          content: {
            message: `Error updating warehouse: ${error.message}`,
          },
        }
      }

      return {
        statusCode: 500,
        content: {
          message:
            'An unexpected error occurred while updating the warehouse. Please try again later.',
        },
      }
    }
  }
}
