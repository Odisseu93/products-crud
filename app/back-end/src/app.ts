import { App, parseData } from 'vkrun'
import productsRouter from './routes/products'

const app = App()

app.use(parseData())
app.use(productsRouter)

export { app }
