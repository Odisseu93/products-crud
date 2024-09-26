import { Request } from 'vkrun'

export interface CreateProductBodyRequestInterface extends Request {
  params: {
    id: string
  }
  body: {
    name: string
    price: number
  }
}
