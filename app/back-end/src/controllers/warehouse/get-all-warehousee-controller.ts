import { GetAllWarehousesServiceInterface } from '../../interfaces/services/warehouse/get-all-warehouses-service-interface'
import { Controller, Response, Request } from 'vkrun'

export class GetAllWarehousesController implements Controller {
  private getAllWarehousesService: GetAllWarehousesServiceInterface
  constructor(getWarehouseService: GetAllWarehousesServiceInterface) {
    this.getAllWarehousesService = getWarehouseService
  }

  public async handle(req: Request, res: Response) {
    const output = await this.getAllWarehousesService.execute()

    res.status(output.statusCode).json({ warehouses: output.content })
  }
}
