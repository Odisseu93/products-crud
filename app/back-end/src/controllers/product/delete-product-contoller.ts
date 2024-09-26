import { DeleteProductServiceInterface } from '../../interfaces/services/product/delete-product-interface'
import { Controller, Response, Request } from 'vkrun'


export class DeleteProductController implements Controller {
  private deleteProductService: DeleteProductServiceInterface
  constructor(deleteProductService: DeleteProductServiceInterface) {
    this.deleteProductService = deleteProductService
  }

  public async handle(req: Request, res: Response) {
    const id = req.params?.id as string

    const output = await this.deleteProductService.execute({id})

    res.status(output.statusCode).json(output.content)
  }
}
