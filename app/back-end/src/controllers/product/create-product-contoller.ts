import { CreateProductServiceInterface } from '../../interfaces/services/product/create-product-interface'
import { Controller, Response, Request } from 'vkrun'

export class CreateProductController implements Controller {
  private createProductService: CreateProductServiceInterface
  constructor(createProductService: CreateProductServiceInterface) {
    this.createProductService = createProductService
  }

  public async handle(req: Request, res: Response) {
    const { name, price } = req.body
    const output = await this.createProductService.execute({ name, price })

    res.status(output.statusCode).json(output.content)
  }
}
