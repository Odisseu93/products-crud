import { InputCreateProductService } from 'back-end/src/interfaces/services/product/create-product-interface'
import {
  closeConnection,
  openConnection,
  ProductRepositorySqlite,
} from '../../../repositories/sqlite/__mock__/products-repository-sqlite'
import { CreateProductService } from '../create-product-service'

describe('CreateProductService', () => {
  it('Should create a new product', async () => {
    await openConnection()
    const repository = new ProductRepositorySqlite()
    const service = new CreateProductService(repository)

    const product: InputCreateProductService = {
      name: 'Test Product',
      price: 10.99,
    }
    const sut = await service.execute(product)
    await closeConnection()

    expect(sut.content).toHaveProperty('id')
    expect(sut.content).toHaveProperty('name', 'Test Product')
    expect(sut.content).toHaveProperty('price', 10.99)
  })
})
