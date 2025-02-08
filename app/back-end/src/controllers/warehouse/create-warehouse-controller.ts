import { CreateWarehouseServiceInterface } from '../../interfaces/services/warehouse/create-warehouse-service-interface'
import { Controller, Response, Request } from 'vkrun'

export class CreateWarehouseController implements Controller {
  private createWarehouseService: CreateWarehouseServiceInterface
  constructor(createProductService: CreateWarehouseServiceInterface) {
    this.createWarehouseService = createProductService
  }

  public async handle(req: Request, res: Response) {
    const { name, location } = req.body
    const output = await this.createWarehouseService.execute({ name, location })

    res.status(output.statusCode).json(output.content)
  }
}
