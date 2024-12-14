import prisma from '../../libs/prisma'
import { ProductEntity } from '../../entities/product-entity'
import { ProductRepositoryInterface } from 'back-end/src/interfaces/repositories/product/product-repository-interface'

export class ProductRepositoryPrisma implements ProductRepositoryInterface {
  public async create({ id, name, price }: ProductEntity) {
    return (await prisma.products.create({
      data: {
        id,
        name,
        price,
      },
    })) as ProductEntity
  }

  public async update({ id, name, price }: ProductEntity) {
    return (await prisma.products.update({
      where: { id },
      data: { name, price },
    })) as ProductEntity
  }

  public async delete(productId: string) {
    return (await prisma.products.delete({
      where: { id: productId },
    })) as ProductEntity
  }

  public async get(productId: string) {
    return (await prisma.products.findUnique({
      where: { id: productId },
    })) as ProductEntity
  }

  public async getAll() {
    return (await prisma.products.findMany()) as ProductEntity[]
  }
}
