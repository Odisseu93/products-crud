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

  public async delete(productId: string) {
    await db.open()

    const stmt = await db.prepare('DELETE FROM products WHERE id == ? RETURNING *')
    await stmt.bind(productId)

    const deletedProduct = await stmt.get()
    await stmt.finalize()
    db.close()

    return deletedProduct
  }

  public async get(productId: string) {
    await db.open()
    const stmt = await db.prepare('SELECT * FROM products WHERE id = ?')

    await stmt.bind(productId)
    const product = await stmt.get()
    await stmt.finalize()
    await db.close()
    
    return product
  }

  public async getAll() {
    await db.open()
    const products = await db.all('SELECT * FROM products')
    await db.close()
    return products
  }
}
