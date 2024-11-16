import { GetProductServiceInterface } from '../../interfaces/services/product/get-product-interface'
import { Controller, Response, Request } from 'vkrun'

type GetProductParameters = { id: string }
export class GetProductController implements Controller {
  private getProductService: GetProductServiceInterface
  constructor(getProductService: GetProductServiceInterface) {
    this.getProductService = getProductService
  }

  public async handle(req: Request, res: Response) {
    const params = req.params as GetProductParameters

    const output = await this.getProductService.execute({ id: params?.id })

    res.status(output.statusCode).json(output.content)
  }
}
