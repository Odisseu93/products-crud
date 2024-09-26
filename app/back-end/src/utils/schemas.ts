import { schema as vs } from 'vkrun'
import { VkrunCors } from 'vkrun/lib/modules/cors'

export const createProductSchema = vs().object({
  body: vs().object({
    name: vs().string(),
    price: vs().number().min(0),
  }),
})

export const updateProductSchema = vs().object({
  params: vs().object({
    id: vs().string(),
  }),
  body: vs().object({
    name: vs().string(),
    price: vs().number().min(0),
  }),
})

export const ProductIdSchema = vs().object({
  params: vs().object({
    id: vs().string(),
  }),
})
