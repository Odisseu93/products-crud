import { UpdateWarehouseServiceInterface } from '../../interfaces/services/warehouse/update-warehouse-service-interface'
import { Controller, Response, Request } from 'vkrun'

export class UpdateWarehouseController implements Controller {
  private createWarehouseService: UpdateWarehouseServiceInterface
  constructor(createProductService: UpdateWarehouseServiceInterface) {
    this.createWarehouseService = createProductService
  }

  public async handle(
    req: Request<{
      params: {
        id: string
      }
    }>,
    res: Response
  ) {
    const { id } = req.params
    const { name, location } = req.body
    const output = await this.createWarehouseService.execute({
      id,
      name,
      location,
    })

    res.status(output.statusCode).json(output.content)
  }
}
