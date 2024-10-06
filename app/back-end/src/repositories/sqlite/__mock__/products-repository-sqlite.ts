import { ProductEntity } from '../../../entities/product-entity'
import { db, dbInit } from '../../../db/__mock__'

const createProductTable = async () =>
  await db.exec(
    'CREATE TABLE IF NOT EXISTS "products" ( id TEXT NOT NULL, name TEXT NOT NULL, price REAL NOT NULL, PRIMARY KEY(id))'
  )

export const openConnection = async () => await db.open()
export const closeConnection = async () => await db.close()

export class ProductRepositorySqlite {
  public async create({ id, name, price }: ProductEntity) {
    await createProductTable()
    const stmt = await db.prepare(
      'INSERT INTO products (id, name, price) VALUES (?, ?, ?) RETURNING *;'
    )

    await stmt.bind(id, name, price)

    const createProduct = await stmt.get()

    await stmt.finalize()

    return createProduct
  }

  public async update({ id, name, price }: ProductEntity) {
    const stmt = await db.prepare(
      'UPDATE products SET name = ?, price = ? WHERE id = ? RETURNING *;'
    )

    await stmt.bind(name, price, id)

    const updatedProduct = await stmt.get()

    await stmt.finalize()

    return updatedProduct
  }

  public async delete(productId: string) {
    const stmt = await db.prepare(
      'DELETE FROM products WHERE id == ? RETURNING *'
    )
    await stmt.bind(productId)

    const deletedProduct = await stmt.get()
    await stmt.finalize()

    return deletedProduct
  }

  public async get(productId: string) {
    const stmt = await db.prepare('SELECT * FROM products WHERE id = ?')

    await stmt.bind(productId)
    const product = await stmt.get()
    await stmt.finalize()

    return product
  }

  public async getAll() {
    const products = await db.all('SELECT * FROM products')
    return products
  }
}
