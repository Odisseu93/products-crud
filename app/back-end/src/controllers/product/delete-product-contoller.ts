import { DeleteProductServiceInterface } from '../../interfaces/services/product/delete-product-interface'
import { Controller, Response, Request } from 'vkrun'

type DeleteProductParameters = { id: string }
export class DeleteProductController implements Controller {
  private deleteProductService: DeleteProductServiceInterface
  constructor(deleteProductService: DeleteProductServiceInterface) {
    this.deleteProductService = deleteProductService
  }

  public async handle(req: Request, res: Response) {
    const params = req.params as DeleteProductParameters

    const output = await this.deleteProductService.execute({ id: params.id })

    res.status(output.statusCode).json(output.content)
  }
}
