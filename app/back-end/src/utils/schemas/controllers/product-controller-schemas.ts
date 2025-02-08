import { schema as vs } from 'vkrun'

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

export const productIdSchema = vs().object({
  params: vs().object({
    id: vs().string(),
  }),
})
