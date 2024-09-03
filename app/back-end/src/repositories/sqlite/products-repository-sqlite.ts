import { ProductEntity } from '../../entities/product-entity'
import { db } from '../../db'

export class ProductRepositorySqlite {
  public async create({ id, name, price }: ProductEntity) {
    await db.open()
    const stmt = await db.prepare(
      'INSERT INTO products (id, name, price) VALUES (?, ?, ?);'
    )

    await stmt.bind(id, name, price)

    await stmt.all()

    console.log('string')
    const product = await db.get(
      'SELECT id, name, price FROM products WHERE id = ?',
      id
    )
    console.log({ product })

    await stmt.finalize()
    await db.close()

    return product
  }

  public async update(product: ProductEntity) {}

  public async delete(productId: string) {}

  public async get(productId: string) {
    await db.open()
    const product = await db.get(
      'SELECT * FROM products WHERE id = ' + productId
    )
    await db.open()
    return product
  }
}
