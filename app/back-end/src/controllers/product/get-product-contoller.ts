import { GetProductServiceInterface } from '../../interfaces/services/product/get-product-interface'
import { Controller, Response, Request } from 'vkrun'


export class GetProductController implements Controller {
  private getProductService: GetProductServiceInterface
  constructor(getProductService: GetProductServiceInterface) {
    this.getProductService = getProductService
  }

  public async handle(req: Request, res: Response) {
    const id = req.params?.id as string

    const output = await this.getProductService.execute({id})

    res.status(output.statusCode).json(output.content)
  }
}
