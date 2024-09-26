import { ProductEntity } from '../../entities/product-entity'
import { db } from '../../db'

export class ProductRepositorySqlite {
  public async create({ id, name, price }: ProductEntity) {
    await db.open()
    const stmt = await db.prepare(
      'INSERT INTO products (id, name, price) VALUES (?, ?, ?) RETURNING *;'
    )

    await stmt.bind(id, name, price)

    const createProduct = await stmt.get()

    await stmt.finalize()
    await db.close()

    return createProduct
  }

  public async update({ id, name, price }: ProductEntity) {
    await db.open()
    const stmt = await db.prepare(
      'UPDATE products SET name = ?, price = ? WHERE id = ? RETURNING *;'
    )

    await stmt.bind(name, price, id)

    const updatedProduct = await stmt.get()

    await stmt.finalize()
    await db.close()

    return updatedProduct
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
