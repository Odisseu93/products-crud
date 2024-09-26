import { Request } from 'vkrun'

export interface GetProductBodyRequestInterface extends Request {
  params: {
      id: string
  }
}
