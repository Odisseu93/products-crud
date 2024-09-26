import { GetAllProductsServiceInterface } from '../../interfaces/services/product/get-all-products-interface'
import { Controller, Response, Request } from 'vkrun'

export class GetAllProductsController implements Controller {
  private getAllProductsService: GetAllProductsServiceInterface
  constructor(getAllProductsService: GetAllProductsServiceInterface) {
    this.getAllProductsService = getAllProductsService
  }

  public async handle(req: Request, res: Response) {
    const output = await this.getAllProductsService.execute()

    res.status(output.statusCode).json({ products: output.content })
  }
}
