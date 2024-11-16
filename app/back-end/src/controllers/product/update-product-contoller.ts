import { UpdateProductServiceInterface } from '../../interfaces/services/product/update-product-interface'
import { Controller, Response, Request } from 'vkrun'

type UpdateProductParameters = { id: string }
export class UpdateProductController implements Controller {
  private updateProductService: UpdateProductServiceInterface
  constructor(updateProductService: UpdateProductServiceInterface) {
    this.updateProductService = updateProductService
  }

  public async handle(req: Request, res: Response) {
    const params = req.params as UpdateProductParameters
    const body = req.body

    const output = await this.updateProductService.execute({
      id: params.id,
      name: body.name,
      price: body.price,
    })

    res.status(output.statusCode).json(output.content)
  }
}
