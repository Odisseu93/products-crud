import { UpdateProductServiceInterface } from '../../interfaces/services/product/update-product-interface'
import { Controller, Response, Request } from 'vkrun'


export class UpdateProductController implements Controller {
    private updateProductService: UpdateProductServiceInterface
    constructor(updateProductService: UpdateProductServiceInterface) {
        this.updateProductService = updateProductService
    }

    public async handle(req: Request, res: Response) {
        const { id }  = req.params as { id: string }
        const { name, price } = req.body

        const output = await this.updateProductService.execute({ id, name, price })

        res.status(output.statusCode).json(output.content)
    }
}
