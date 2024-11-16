import v from 'vkrun'
import { app } from '../../__mock__/app'
import { db } from '../../db/__mock__'
import { validateRouteData } from '../../middlewares/validateRouteData'
import { createProductSchema, updateProductSchema } from '../../utils/schemas'
import { productIdSchema } from '../../utils/schemas'
import { createProductControllerFactory } from '../../factories/__mock__/create-product-controller-factory'
import { getProductControllerFactory } from '../../factories/__mock__/get-product-controller-factory'
import { updateProductControllerFactory } from '../../factories/__mock__/update-product-controller-factory'
import { deleteProductControllerFactory } from '../../factories/__mock__/delete-product-controller-factory'
import { getAllProductsControllerFactory } from '../../factories/__mock__/get-all-products-controller-factory'

const router = v.Router()

const createProductURL = '/product/create'
const getProductURL = '/product/get/:id'
const updateProductURL = '/product/update/:id'
const deleteProductURL = '/product/delete/:id'
const getAllProductsURL = '/product/get/all'

router.post(
  createProductURL,
  validateRouteData(createProductSchema),
  createProductControllerFactory()
)

router.get(getAllProductsURL, getAllProductsControllerFactory())
router.get(
  getProductURL,
  validateRouteData(productIdSchema),
  getProductControllerFactory()
)

router.put(
  updateProductURL,
  validateRouteData(updateProductSchema),
  updateProductControllerFactory()
)

router.delete(
  deleteProductURL,
  validateRouteData(productIdSchema),
  deleteProductControllerFactory()
)

app.use(router)

describe('product.e2e', () => {
  beforeAll(async () => {
    await db.open()
    await db.exec(
      'CREATE TABLE IF NOT EXISTS "products" ( id TEXT NOT NULL, name TEXT NOT NULL, price REAL NOT NULL, PRIMARY KEY(id))'
    )
  })

  afterAll(async () => {
    await db.close()
  })
  beforeEach(async () => {
    await db.run('DELETE FROM products')
  })

  it('should create a new product', async () => {
    const body = {
      name: 'Product 1',
      price: 10.99,
    }

    const response = await v.superRequest(app).post(createProductURL, body)

    expect(response.statusCode).toBe(201)
    expect(response.data).toHaveProperty('id')
    expect(response.data).toMatchObject(body)
  })

  it('should return an error when creating a product with invalid data', async () => {
    const body = {
      name: 'Product 1',
      price: -10.99, // Invalid price
    }

    try {
      await v.superRequest(app).post(createProductURL, body)
    } catch (error: any) {
      const { statusCode, data } = error.response

      expect(statusCode).toBe(400)
      expect(data).toHaveProperty(
        'message',
        'price must be greater than or equal to 0!'
      )
    }
  })

  it('should get a product by ID', async () => {
    let productId: string = ''
    const body = {
      name: 'Product 1',
      price: 10.99,
    }

    const response = await v.superRequest(app).post(createProductURL, body)
    const createdProduct = response.data
    productId = createdProduct.id

    const getResponse = await v
      .superRequest(app)
      .get(getProductURL.replace(':id', productId))

    expect(getResponse.statusCode).toBe(200)
    expect(response.data).toHaveProperty('id', productId)
    expect(getResponse.data).toEqual(createdProduct)
  })

  it('should return an error when getting a product by invalid ID', async () => {
    const invalidId = 'invalid-id'

    try {
      await v.superRequest(app).get(getProductURL.replace(':id', invalidId))
    } catch (error: any) {
      const { statusCode, data } = error.response

      expect(statusCode).toBe(404)
      expect(data).toHaveProperty('message', 'Product not found')
    }
  })

  it('should delete a product by ID', async () => {
    let productId: string = ''
    const body = {
      name: 'Product 1',
      price: 10.99,
    }

    const response = await v.superRequest(app).post(createProductURL, body)
    const createdProduct = response.data
    productId = createdProduct.id

    const deleteResponse = await v
      .superRequest(app)
      .delete(deleteProductURL.replace(':id', productId))

    expect(deleteResponse.statusCode).toBe(200)
    expect(deleteResponse.data).toHaveProperty('id', productId)
    expect(deleteResponse.data).toEqual(createdProduct)
  })

  it('should return an error when deleting a product by invalid ID', async () => {
    const invalidId = 'invalid-id'

    try {
      await v
        .superRequest(app)
        .delete(deleteProductURL.replace(':id', invalidId))
    } catch (error: any) {
      const { statusCode, data } = error.response

      expect(statusCode).toBe(404)
      expect(data).toHaveProperty('message', 'Product not found')
    }
  })

  it('should get all products', async () => {
    const body1 = {
      name: 'Product 1',
      price: 10.99,
    }

    const body2 = {
      name: 'Product 2',
      price: 20.99,
    }

    const [createResponse1, createResponse2] = await Promise.all([
      await v.superRequest(app).post(createProductURL, body1),
      await v.superRequest(app).post(createProductURL, body2),
    ])

    const getResponse = await v.superRequest(app).get(getAllProductsURL)

    expect(getResponse.statusCode).toBe(200)
    expect(getResponse.data.products.map((a: any) => a.id).sort()).toEqual(
      [createResponse1.data, createResponse2.data].map((a: any) => a.id).sort()
    )
  })

  it('should return an empty array when getting all products', async () => {
    const getResponse = await v.superRequest(app).get(getAllProductsURL)

    expect(getResponse.statusCode).toBe(200)
    expect(getResponse.data.products).toEqual([])
  })

  it('should update a product by ID', async () => {
    let productId: string = ''
    const body = {
      name: 'Product 1',
      price: 10.99,
    }

    const response = await v.superRequest(app).post(createProductURL, body)
    const createdProduct = response.data
    productId = createdProduct.id

    const updatedBody = {
      name: 'Updated Product 1',
      price: 15.99,
    }

    const updateResponse = await v
      .superRequest(app)
      .put(updateProductURL.replace(':id', productId), updatedBody)

    expect(updateResponse.statusCode).toBe(200)
    expect(updateResponse.data).toHaveProperty('id', productId)
    expect(updateResponse.data).toMatchObject(updatedBody)
  })

  it('should return an error when updating a product by invalid ID', async () => {
    const invalidId = 'invalid-id'
    const updatedBody = {
      name: 'Updated Product 1',
      price: 15.99,
    }

    try {
      await v
        .superRequest(app)
        .put(updateProductURL.replace(':id', invalidId), updatedBody)
    } catch (error: any) {
      const { statusCode, data } = error.response

      expect(statusCode).toBe(404)
      expect(data).toHaveProperty('message', 'Product not found')
    }
  })
})
