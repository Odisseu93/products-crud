import {
  closeConnection,
  openConnection,
  ProductRepositorySqlite,
} from '../../../repositories/sqlite/__mock__/products-repository-sqlite'
import { CreateProductService } from '../create-product-service'
import { GetAllProductsService } from '../get-all-products-service'
import { UpdateProductService } from '../update-product-service'

describe('getAllProduts', () => {
  it('Should get a list of products', async () => {
    await openConnection()
    const repository = new ProductRepositorySqlite()
    const createProductservice = new CreateProductService(repository)
    const getAllProductService = new GetAllProductsService(repository)

    const p1 = (
      await createProductservice.execute({
        name: 'Test Product',
        price: 10.99,
      })
    ).content

    if ('message' in p1) throw new Error(p1.message)

    const p2 = (
      await createProductservice.execute({
        name: 'Test Product 2',
        price: 15.99,
      })
    ).content

    if ('message' in p2) throw new Error(p2.message)

    const p3 = (
      await createProductservice.execute({
        name: 'Test Product 3',
        price: 20.99,
      })
    ).content

    if ('message' in p3) throw new Error(p3.message)

    const sut = (await getAllProductService.execute()).content
    await closeConnection()

    if ('message' in sut) throw new Error(sut.message)
    expect(sut).toHaveProperty('length', 3)

    expect(sut).toEqual(expect.arrayContaining([p1, p2, p3]))
  })
})
