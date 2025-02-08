import { DeleteWarehouseServiceInterface } from '../../interfaces/services/warehouse/delete-warehouse-service-interface'
import { Controller, Response, Request } from 'vkrun'

export class DeleteWarehouseController implements Controller {
  private deleteWarehouseService: DeleteWarehouseServiceInterface
  constructor(deleteWarehouseService: DeleteWarehouseServiceInterface) {
    this.deleteWarehouseService = deleteWarehouseService
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
    const output = await this.deleteWarehouseService.execute({ id })

    res.status(output.statusCode).json(output.content)
  }
}
