import { Request } from 'vkrun'

export interface CreateProductBodyRequestInterface extends Request {
  body: {
    name: string
    price: number
  }
}
