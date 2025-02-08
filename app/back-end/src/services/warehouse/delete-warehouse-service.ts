import { WarehouseRepositoryInterface } from '../../interfaces/repositories/warehouse/warehouse-repository-interface'
import {
  DeleteWarehouseServiceInterface,
  DeleteWarehouseServiceInput,
  DeleteWarehouseServiceOutput,
} from '../../interfaces/services/warehouse/delete-warehouse-service-interface'

export class DeleteWarehouseService implements DeleteWarehouseServiceInterface {
  private warehouseRepository: WarehouseRepositoryInterface

  constructor(warehouseRepository: WarehouseRepositoryInterface) {
    this.warehouseRepository = warehouseRepository
  }

  public async execute(
    input: DeleteWarehouseServiceInput
  ): Promise<DeleteWarehouseServiceOutput> {
    try {
      const deletedWarehouse = await this.warehouseRepository.delete(input.id)
      return {
        statusCode: 200,
        content: deletedWarehouse,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          statusCode: 503,
          content: {
            message: `Error deleting warehouse: ${error.message}`,
          },
        }
      }

      return {
        statusCode: 404,
        content: {
          message: 'Warehouse not found',
        },
      }
    }
  }
}
