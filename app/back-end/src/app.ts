import { App, parseData } from 'vkrun'
import productsRouter from './routes/products'
import warehouseRouter from './routes/warehouse'

const app = App()

app.use(parseData())
app.use(productsRouter)
app.use(warehouseRouter)

export { app }
