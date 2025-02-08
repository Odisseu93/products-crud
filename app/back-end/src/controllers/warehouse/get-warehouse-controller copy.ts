import { GetWarehouseServiceInterface } from '../../interfaces/services/warehouse/get-warehouse-service-interface'
import { Controller, Response, Request } from 'vkrun'

export class GetWarehouseController implements Controller {
  private getWarehouseService: GetWarehouseServiceInterface
  constructor(getWarehouseService: GetWarehouseServiceInterface) {
    this.getWarehouseService = getWarehouseService
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
    const output = await this.getWarehouseService.execute({ id })

    res.status(output.statusCode).json(output.content)
  }
}
