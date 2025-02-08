import { WarehouseRepositoryInterface } from '../../interfaces/repositories/warehouse/warehouse-repository-interface'
import {
  GetAllWarehousesServiceInterface,
  GetAllWarehousesServiceOutput,
} from '../../interfaces/services/warehouse/get-all-warehouses-service-interface'

export class GetAllWarehousesService
  implements GetAllWarehousesServiceInterface
{
  private warehouseRepository: WarehouseRepositoryInterface

  constructor(warehouseRepository: WarehouseRepositoryInterface) {
    this.warehouseRepository = warehouseRepository
  }

  public async execute(): Promise<GetAllWarehousesServiceOutput> {
    try {
      const warehouses = await this.warehouseRepository.getAll()
      if (!warehouses) {
        return {
          statusCode: 404,
          content: {
            message: 'No warehouses found',
          },
        }
      }
      return {
        statusCode: 200,
        content: warehouses,
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
            ' An unexpected error occurred while getting the warehouses. Please try again later.',
        },
      }
    }
  }
}
