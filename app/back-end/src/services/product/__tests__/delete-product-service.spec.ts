import {
  closeConnection,
  openConnection,
  ProductRepositorySqlite,
} from '../../../repositories/sqlite/__mock__/products-repository-sqlite'
import { CreateProductService } from '../create-product-service'
import { DeleteProductService } from '../delete-product-service'
import { UpdateProductService } from '../update-product-service'

describe('UpdateProductService', () => {
  it('Should delete a product', async () => {
    await openConnection()
    const repository = new ProductRepositorySqlite()
    const createProductservice = new CreateProductService(repository)
    const deleteProductservice = new DeleteProductService(repository)

    const product = (
      await createProductservice.execute({
        name: 'Test Product',
        price: 10.99,
      })
    ).content

    if ('message' in product) throw new Error(product.message)

    const { id } = product

    const sut = await deleteProductservice.execute({ id })

    await closeConnection()

    expect(sut.content).toEqual(product)
  })
})
