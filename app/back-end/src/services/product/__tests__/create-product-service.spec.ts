import { db } from '../../../db/__mock__'
import { InputCreateProductService } from '../../../interfaces/services/product/create-product-interface'
import { ProductRepositorySqlite } from '../../../repositories/sqlite/__mock__/products-repository-sqlite'
import { CreateProductService } from '../create-product-service'

describe('CreateProductService', () => {
  beforeAll(async () => {
    await db.open()
    await db.exec(
      'CREATE TABLE IF NOT EXISTS "products" ( id TEXT NOT NULL, name TEXT NOT NULL, price REAL NOT NULL, PRIMARY KEY(id))'
    )
  })

  afterEach(async () => {
    await db.close()
  })

  it('Should create a new product', async () => {
    const repository = new ProductRepositorySqlite()
    const service = new CreateProductService(repository)

    const product: InputCreateProductService = {
      name: 'Test Product',
      price: 10.99,
    }
    const sut = await service.execute(product)

    // await db.close()

    expect(sut.content).toHaveProperty('id')
    expect(sut.content).toHaveProperty('name', 'Test Product')
    expect(sut.content).toHaveProperty('price', 10.99)
  })
})
