import { schema as vs } from 'vkrun'

export const createProductSchema = vs().object({
  body: vs().object({
    name: vs().alias('nome do produto').string(),
    price: vs().alias('preço').number().min(0),
  }),
})
