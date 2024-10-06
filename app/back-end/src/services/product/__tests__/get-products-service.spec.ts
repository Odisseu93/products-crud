import {
  closeConnection,
  openConnection,
  ProductRepositorySqlite,
} from '../../../repositories/sqlite/__mock__/products-repository-sqlite'
import { CreateProductService } from '../create-product-service'
import { GetProductService } from '../get-product-service'

describe('getProdut', () => {
  it('Should get a product by id', async () => {
    await openConnection()
    const repository = new ProductRepositorySqlite()
    const createProductservice = new CreateProductService(repository)
    const getProductService = new GetProductService(repository)

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

    const sut = (await getProductService.execute({ id: p2.id })).content
    await closeConnection()

    expect(sut).toEqual(p2)
  })
})
