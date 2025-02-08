import { schema as vs } from 'vkrun'

export const createWarehouseSchema = vs().object({
  body: vs().object({
    name: vs().string().minWord(1),
    location: vs().string().minWord(1),
  }),
})

export const updateWarehouseSchema = vs().object({
  params: vs().object({
    id: vs().string(),
  }),
  body: vs().object({
    name: vs().string().minWord(1),
    location: vs().string().minWord(1),
  }),
})

export const warehouseIdSchema = vs().object({
  params: vs().object({
    id: vs().string(),
  }),
})
