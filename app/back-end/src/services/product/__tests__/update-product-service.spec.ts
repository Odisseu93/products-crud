import {
  closeConnection,
  openConnection,
  ProductRepositorySqlite,
} from '../../../repositories/sqlite/__mock__/products-repository-sqlite'
import { CreateProductService } from '../create-product-service'
import { UpdateProductService } from '../update-product-service'

describe('UpdateProductService', () => {
  it('Should update a product', async () => {
    await openConnection()
    const repository = new ProductRepositorySqlite()
    const createProductservice = new CreateProductService(repository)
    const updateProductService = new UpdateProductService(repository)

    const product = (
      await createProductservice.execute({
        name: 'Test Product',
        price: 10.99,
      })
    ).content

    if ('message' in product) throw new Error(product.message)

    const { id } = product

    const sut = await updateProductService.execute({
      id,
      name: 'Updated Test Product',
      price: 15.99,
    })

    await closeConnection()

    expect(sut.content).toHaveProperty('id', id)
    expect(sut.content).toHaveProperty('name', 'Updated Test Product')
    expect(sut.content).toHaveProperty('price', 15.99)
  })
})
