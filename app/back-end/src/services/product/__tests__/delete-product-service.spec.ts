import { db } from '../../../db/__mock__'
import { ProductRepositorySqlite } from '../../../repositories/sqlite/__mock__/products-repository-sqlite'
import { CreateProductService } from '../create-product-service'
import { DeleteProductService } from '../delete-product-service'
import { UpdateProductService } from '../update-product-service'

describe('UpdateProductService', () => {
  beforeAll(async () => {
    await db.open()
    await db.exec(
      'CREATE TABLE IF NOT EXISTS "products" ( id TEXT NOT NULL, name TEXT NOT NULL, price REAL NOT NULL, PRIMARY KEY(id))'
    )
  })

  afterEach(async () => {
    await db.close()
  })

  it('Should delete a product', async () => {
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
    expect(sut.content).toEqual(product)
  })
})
